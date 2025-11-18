import { JWTPayload, SignJWT, jwtVerify } from 'jose'

/**
 * Specifies the private crypto key for the symetric HS256 encryption.
 */
const cryptoKey = new TextEncoder().encode(
  '08bca4435f1a4c46801691c859ce504716fd68fd113d43ecbc2754649ee401f7380ac84e877a481f84a3ec8c530851958773d1af93bf4b4cba15bd04c627de01'
)

/**
 * Generates a new JWT Token string containing the given JWT claims.
 * @param claims Claims to be signed and stored into the token.
 * @returns Returns the generated token as string.
 */
export async function generateToken(claims: JWTPayload): Promise<string> {
  return new SignJWT(claims)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('urn:bwz-rappi-m295.example.com')
    .setExpirationTime('30d')
    .setAudience(`urn:bwz-rappi-m295.example.com`)
    .sign(cryptoKey)
}

/**
 * Verifies the integrity of the given JWT Token string and returns the containing claims.
 * @param jwtToken Encrypted token string code to be checked.
 * @returns Returns the extracted claims of the token.
 */
export async function verifyToken(jwtToken: string): Promise<JWTPayload> {
  try {
    const { payload } = await jwtVerify(jwtToken, cryptoKey, { algorithms: [ 'HS256' ] } )
    return payload // claims
  } catch {
    return { }
  }
}