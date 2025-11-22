import bcrypt from 'bcryptjs'

import { initializeUserDb, userDb } from '../schemas/user'

export async function intializeData() {

  await initializeUserDb()

  const dbEmpty = (await userDb().countAsync({}) === 0)

  if (dbEmpty) {
    await userDb().insertAsync({
      email: 'admin@example.com',
      passwordHash: bcrypt.hashSync('changeme123'),
      savedTeams: [],
      savedDrivers: [],
      savedVehicles: []
    })

  }
}