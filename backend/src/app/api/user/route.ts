import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import z from 'zod'
import { verifyToken } from '@/lib/jwt/jwt-generator'
import { getJwtHeader } from '@/lib/jwt/jwt-auth'
import { userDb } from '@/lib/db/schemas/user'

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  }
}

function jsonResponse(data: object, status: number = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders() })
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() })
}

const UpdateProfileDto = z.object({
  email: z.string().email().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6).optional(),
})

export async function GET(request: NextRequest) {
  try {
    const token = getJwtHeader(request)
    
    if (!token) {
      console.log('❌ GET /api/user: No token provided')
      return jsonResponse({ message: 'No token provided' }, 401)
    }

    const payload = await verifyToken(token)
    console.log('🔍 GET /api/user: Token payload:', payload)
    
    if (!payload || !payload._userId) {
      console.log('❌ GET /api/user: Invalid token payload')
      return jsonResponse({ message: 'Invalid or expired token' }, 401)
    }

    console.log('🔍 GET /api/user: Looking for user with _id:', payload._userId)

    const user = await userDb().findOneAsync({ _id: payload._userId as string })
    
    if (!user) {
      console.log('❌ GET /api/user: User not found in database')
      
      // Debug: Liste alle User IDs auf
      const allUsers = await userDb().findAsync({})
      console.log('📋 All users in DB:', allUsers.map(u => ({ _id: u._id, email: u.email })))
      
      return jsonResponse({ message: 'User not found' }, 404)
    }

    console.log('✅ GET /api/user: User found:', user.email)

    return jsonResponse({
      _id: user._id,
      email: user.email,
      savedTeams: user.savedTeams || [],
      savedDrivers: user.savedDrivers || [],
      savedVehicles: user.savedVehicles || []
    })
    
  } catch (err) {
    console.error('💥 GET /api/user error:', err)
    return jsonResponse({ message: 'Server error' }, 500)
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getJwtHeader(request)
    
    if (!token) {
      console.log('❌ PUT /api/user: No token provided')
      return jsonResponse({ message: 'No token provided' }, 401)
    }

    const payload = await verifyToken(token)
    console.log('🔍 PUT /api/user: Token payload:', payload)
    
    if (!payload || !payload._userId) {
      console.log('❌ PUT /api/user: Invalid token')
      return jsonResponse({ message: 'Invalid or expired token' }, 401)
    }

    let body
    try {
      body = await request.json()
    } catch {
      return jsonResponse({ message: 'Invalid JSON body' }, 400)
    }

    const { data, error } = UpdateProfileDto.safeParse(body)
    
    if (error) {
      console.log('❌ PUT /api/user: Validation error:', error.errors)
      return jsonResponse({ 
        message: 'Invalid data', 
        errors: error.errors.map(e => e.message) 
      }, 400)
    }

    const user = await userDb().findOneAsync({ _id: payload._userId as string })
    
    if (!user) {
      console.log('❌ PUT /api/user: User not found')
      return jsonResponse({ message: 'User not found' }, 404)
    }

    const updateData: { email?: string; passwordHash?: string } = {}

    if (data.email && data.email !== user.email) {
      const existingUser = await userDb().findOneAsync({ email: data.email })
      if (existingUser && existingUser._id !== user._id) {
        console.log('❌ PUT /api/user: Email already in use')
        return jsonResponse({ message: 'Email already in use' }, 409)
      }
      updateData.email = data.email
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        return jsonResponse({ message: 'Current password required' }, 400)
      }
      
      const passwordValid = bcrypt.compareSync(data.currentPassword, user.passwordHash)
      if (!passwordValid) {
        console.log('❌ PUT /api/user: Incorrect current password')
        return jsonResponse({ message: 'Current password incorrect' }, 401)
      }
      
      updateData.passwordHash = bcrypt.hashSync(data.newPassword, 10)
    }

    if (Object.keys(updateData).length === 0) {
      return jsonResponse({ message: 'No changes provided' }, 400)
    }

    const result = await userDb().updateAsync(
      { _id: payload._userId as string },
      { $set: updateData }
    )

    if (result.numAffected === 0) {
      console.log('❌ PUT /api/user: Update failed')
      return jsonResponse({ message: 'Update failed' }, 500)
    }

    console.log('✅ PUT /api/user: Profile updated successfully')
    return jsonResponse({ 
      message: 'Profile updated successfully',
      email: updateData.email || user.email
    })
    
  } catch (err) {
    console.error('💥 PUT /api/user error:', err)
    return jsonResponse({ message: 'Server error' }, 500)
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = getJwtHeader(request)
    
    if (!token) {
      console.log('❌ DELETE /api/user: No token provided')
      return jsonResponse({ message: 'No token provided' }, 401)
    }

    const payload = await verifyToken(token)
    console.log('🔍 DELETE /api/user: Token payload:', payload)
    
    if (!payload || !payload._userId) {
      console.log('❌ DELETE /api/user: Invalid token')
      return jsonResponse({ message: 'Invalid or expired token' }, 401)
    }

    let body: { password?: string } = {}
    try {
      body = await request.json()
    } catch {
      // Body ist optional für einige Clients
    }
    
    const { password } = body

    if (!password) {
      return jsonResponse({ message: 'Password confirmation required' }, 400)
    }

    const user = await userDb().findOneAsync({ _id: payload._userId as string })
    
    if (!user) {
      console.log('❌ DELETE /api/user: User not found')
      return jsonResponse({ message: 'User not found' }, 404)
    }

    const passwordValid = bcrypt.compareSync(password, user.passwordHash)
    if (!passwordValid) {
      console.log('❌ DELETE /api/user: Incorrect password')
      return jsonResponse({ message: 'Password incorrect' }, 401)
    }

    const numRemoved = await userDb().removeAsync({ _id: payload._userId as string }, {})

    if (numRemoved === 0) {
      console.log('❌ DELETE /api/user: Delete failed')
      return jsonResponse({ message: 'Delete failed' }, 500)
    }

    console.log('✅ DELETE /api/user: Account deleted successfully')
    return jsonResponse({ message: 'Account deleted successfully' })
    
  } catch (err) {
    console.error('💥 DELETE /api/user error:', err)
    return jsonResponse({ message: 'Server error' }, 500)
  }
}