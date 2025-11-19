import { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/jwt/jwt-generator'
import { getJwtHeader } from '@/lib/jwt/jwt-auth'
import { userDb } from '@/lib/db/schemas/user'
import z from 'zod'

const GarageUpdateDto = z.object({
  savedTeams: z.array(z.string()).max(1).optional(),
  savedDrivers: z.array(z.string()).max(2).optional(),
  savedVehicles: z.array(z.string()).max(1).optional(),
})

type GarageUpdateType = Partial<{
  savedTeams: string[]
  savedDrivers: string[]
  savedVehicles: string[]
}>

export async function GET(request: NextRequest) {
  const token = getJwtHeader(request)
  const payload = await verifyToken(token)
  
  if (!payload._userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const user = await userDb().findOneAsync({ _id: payload._userId })
  
  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  return Response.json({
    savedTeams: user.savedTeams || [],
    savedDrivers: user.savedDrivers || [],
    savedVehicles: user.savedVehicles || []
  })
}

export async function POST(request: NextRequest) {
  const token = getJwtHeader(request)
  const payload = await verifyToken(token)
  
  if (!payload._userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { data, error } = GarageUpdateDto.safeParse(body)
  
  if (error) {
    return Response.json({ message: 'Bad Request' }, { status: 400 })
  }

  const updateData: GarageUpdateType = {}

  if (data.savedTeams !== undefined) updateData.savedTeams = data.savedTeams
  if (data.savedDrivers !== undefined) updateData.savedDrivers = data.savedDrivers
  if (data.savedVehicles !== undefined) updateData.savedVehicles = data.savedVehicles

  await userDb().updateAsync(
    { _id: payload._userId },
    { $set: updateData }
  )

  return Response.json({ message: 'Garage updated successfully' })
}

export async function PUT(request: NextRequest) {
  const token = getJwtHeader(request)
  const payload = await verifyToken(token)
  
  if (!payload._userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { type, id } = await request.json()
  
  if (!type || !id) {
    return Response.json({ message: 'Type and ID required' }, { status: 400 })
  }

  const user = await userDb().findOneAsync({ _id: payload._userId })
  
  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  const updateData: GarageUpdateType = {}
  
  if (type === 'team') {
    const currentTeams = user.savedTeams || []
    if (currentTeams.includes(id)) {
      updateData.savedTeams = currentTeams.filter(t => t !== id)
    } else {
      updateData.savedTeams = [id]
    }
  } 
  
  else if (type === 'driver') {
    const currentDrivers = user.savedDrivers || []
    if (currentDrivers.includes(id)) {
      updateData.savedDrivers = currentDrivers.filter(d => d !== id)
    } else {
      if (currentDrivers.length >= 2) {
        return Response.json({ message: 'Maximum 2 drivers allowed' }, { status: 400 })
      }
      updateData.savedDrivers = [...currentDrivers, id]
    }
  } 
  
  else if (type === 'vehicle') {
    const currentVehicles = user.savedVehicles || []
    if (currentVehicles.includes(id)) {
      updateData.savedVehicles = currentVehicles.filter(v => v !== id)
    } else {
      updateData.savedVehicles = [id]
    }
  } 
  
  else {
    return Response.json({ message: 'Invalid type' }, { status: 400 })
  }

  await userDb().updateAsync(
    { _id: payload._userId },
    { $set: updateData }
  )

  return Response.json({ 
    message: 'Garage updated',
    saved: updateData
  })
}
