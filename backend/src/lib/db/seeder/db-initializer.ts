
import bcrypt from 'bcryptjs'

import { initializeUserDb, userDb } from '../schemas/user'

export async function intializeData() {

  await initializeUserDb()

  const dbEmpty = (await userDb().countAsync({}) === 0)

  if (dbEmpty) {
    // Admin User erstellen
    const admin = await userDb().insertAsync({
      email: 'admin@example.com',
      passwordHash: bcrypt.hashSync('$user1234')
    })

  }
}