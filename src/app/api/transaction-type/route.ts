import { NextResponse } from 'next/server'

import { db } from '@/database/connect'
import { transactionType } from '@/database/schema'

export async function GET() {
  const query = db.select().from(transactionType).orderBy(transactionType.description)
  const result = await query.execute()
  
  return NextResponse.json(result)
}
