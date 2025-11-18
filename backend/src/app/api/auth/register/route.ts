/**
 * Solution Exercise 5.
 */
import { NextRequest } from 'next/server'
import bcrypt from 'bcryptjs'
import z from 'zod'
import { generateToken } from '@/lib/jwt/jwt-generator'
import { userDb } from '@/lib/db/schemas/user'

const CredentialDto = z.object({
  email: z.string(),
  password: z.string(),
})

/**
 * POST: api/users/register
 */
export const POST = async function(request: NextRequest) {
  const { data, error } = CredentialDto.safeParse(await request.json());
  if (error) { return Response.json({ message: "Bad Request" }, { status: 400 }) }

  // optional iv)
  const user = await userDb().findOneAsync({ email: data.email });
  if (user) { return Response.json({ }, { status: 409 }) }

  const newUser = await userDb().insertAsync({
    email: data.email,
    passwordHash: bcrypt.hashSync(data.password)
  });
  return Response.json({
    email: data.email,
    jwt: await generateToken({ _userId: newUser._id })
  });
}