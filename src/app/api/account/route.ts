import { type NextRequest, NextResponse } from 'next/server'

import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { account } from '@/database/schema'

export async function GET() {
  const result = await db.query.account.findMany({
    with: {
      type: true
    }
  })
  
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const data = createInsertSchema(account).parse(body)
  
  const query = db.insert(account).values(data)
  const newData = await query.returning()
  
  return NextResponse.json(newData)
}
