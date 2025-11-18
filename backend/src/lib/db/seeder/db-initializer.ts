/**
 * Solution Exercise 1 and Exercise 2.
 */
import bcrypt from 'bcryptjs'

import { initializeUserDb, userDb } from '../schemas/user'

export async function intializeData() {

  await initializeUserDb()

  const dbEmpty = (await userDb().countAsync({ }) === 0)

  if (dbEmpty) {
    const admin = await userDb().insertAsync({
      email: 'admin@example.com',
      passwordHash: bcrypt.hashSync('$user1234')
    })

    await userDb().insertAsync({
      _id: admin._id,
      name: 'Einkaufen',
      description: 'Brot, Energy Drink, Süsszeug, Salat',
      completionDate: null,
      dueDate: null
    })
  }
}