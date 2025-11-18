import {NextRequest} from 'next/server'

/**
 *  Helper Functions for JWT request handling
 */

export function getJwtHeader(request: NextRequest): string {
  const authHeader = request.headers.get('authorization');
  return (authHeader ? authHeader.substring(`Bearer `.length) : '');
}