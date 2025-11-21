import { teams } from '@/lib/db/data'

export async function GET() {
  return Response.json(teams)
}