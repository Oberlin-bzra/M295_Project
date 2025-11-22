import { JWTPayload, SignJWT, jwtVerify } from 'jose'

const getSecretKey = () => {
  const secret = process.env.JWT_SECRET
  if (!secret) {
    throw new Error('JWT_SECRET is not defined in environment variables')
  }
  return new TextEncoder().encode(secret)
}

export async function generateToken(claims: JWTPayload): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:bwz-rappi-m295.example.com')
    .setExpirationTime('30d')
    .setAudience('urn:bwz-rappi-m295.example.com')
    .sign(getSecretKey())
}

export async function verifyToken(jwtToken: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(jwtToken, getSecretKey(), { 
      algorithms: ['HS256'] 
    })
    return payload 
  } catch {
    return {}
  }
}