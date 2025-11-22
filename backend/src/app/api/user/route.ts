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
    const payload = await verifyToken(token)
    
    if (!payload._userId) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    const user = await userDb().findOneAsync({ _id: payload._userId })
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404, headers: corsHeaders() }
      )
    }

    return NextResponse.json({
      _id: user._id,
      email: user.email,
      savedTeams: user.savedTeams || [],
      savedDrivers: user.savedDrivers || [],
      savedVehicles: user.savedVehicles || []
    }, { headers: corsHeaders() })
    
  } catch (err) {
    console.error('GET /api/user error:', err)
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500, headers: corsHeaders() }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getJwtHeader(request)
    const payload = await verifyToken(token)
    
    if (!payload._userId) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    const body = await request.json()
    const { data, error } = UpdateProfileDto.safeParse(body)
    
    if (error) {
      return NextResponse.json(
        { message: 'Invalid data', errors: error.errors }, 
        { status: 400, headers: corsHeaders() }
      )
    }

    const user = await userDb().findOneAsync({ _id: payload._userId })
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404, headers: corsHeaders() }
      )
    }

    const updateData: { email?: string; passwordHash?: string } = {}

    if (data.email && data.email !== user.email) {
      const existingUser = await userDb().findOneAsync({ email: data.email })
      if (existingUser) {
        return NextResponse.json(
          { message: 'Email already in use' }, 
          { status: 409, headers: corsHeaders() }
        )
      }
      updateData.email = data.email
    }

    if (data.newPassword) {
      if (!data.currentPassword) {
        return NextResponse.json(
          { message: 'Current password required' }, 
          { status: 400, headers: corsHeaders() }
        )
      }
      
      if (!bcrypt.compareSync(data.currentPassword, user.passwordHash)) {
        return NextResponse.json(
          { message: 'Current password incorrect' }, 
          { status: 401, headers: corsHeaders() }
        )
      }
      
      updateData.passwordHash = bcrypt.hashSync(data.newPassword)
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { message: 'No changes provided' }, 
        { status: 400, headers: corsHeaders() }
      )
    }

    await userDb().updateAsync(
      { _id: payload._userId },
      { $set: updateData }
    )

    return NextResponse.json({ 
      message: 'Profile updated successfully',
      email: updateData.email || user.email
    }, { headers: corsHeaders() })
    
  } catch (err) {
    console.error('PUT /api/user error:', err)
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500, headers: corsHeaders() }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = getJwtHeader(request)
    const payload = await verifyToken(token)
    
    if (!payload._userId) {
      return NextResponse.json(
        { message: 'Unauthorized' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    let body = {}
    try {
      body = await request.json()
    } 
    catch {
    }
    
    const { password } = body as { password?: string }

    if (!password) {
      return NextResponse.json(
        { message: 'Password confirmation required' }, 
        { status: 400, headers: corsHeaders() }
      )
    }

    const user = await userDb().findOneAsync({ _id: payload._userId })
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' }, 
        { status: 404, headers: corsHeaders() }
      )
    }

    if (!bcrypt.compareSync(password, user.passwordHash)) {
      return NextResponse.json(
        { message: 'Password incorrect' }, 
        { status: 401, headers: corsHeaders() }
      )
    }

    await userDb().removeAsync({ _id: payload._userId }, {})

    return NextResponse.json(
      { message: 'Account deleted successfully' }, 
      { headers: corsHeaders() }
    )
    
  } catch (err) {
    console.error('DELETE /api/user error:', err)
    return NextResponse.json(
      { message: 'Server error' }, 
      { status: 500, headers: corsHeaders() }
    )
  }
}