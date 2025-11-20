import Datastore from '@seald-io/nedb'
import { z } from 'zod'

export const User = z.object({
  _id: z.string().optional(),
  email: z.string(),
  passwordHash: z.string(),
  savedTeams: z.array(z.string()).max(1).default([]),
  savedDrivers: z.array(z.string()).max(2).default([]),
  savedVehicles: z.array(z.string()).max(1).default([]),
});

export declare type UserModel = z.infer<typeof User>

let nedb: Datastore<UserModel> | null = null

export function userDb() {
  if (!nedb) {
    nedb = new Datastore( {
      filename: './data/user.db',
      autoload: true
    } )
  }
  return nedb
}

export async function initializeUserDb() {
  await userDb().autoloadPromise
}