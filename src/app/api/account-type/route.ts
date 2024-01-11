import { NextResponse } from 'next/server'

import { db } from '@/database/connect'
import { accountType } from '@/database/schema'

export async function GET() {
  const query = db.select().from(accountType)
  const result = await query.execute()
  
  return NextResponse.json(result)
}
