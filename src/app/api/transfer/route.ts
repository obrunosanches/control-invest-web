import { type NextRequest, NextResponse } from 'next/server'

import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { transfer } from '@/database/schema'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const data = createInsertSchema(transfer).parse({
    ...body,
    date: new Date(body.date),
  })
  
  const query = db.insert(transfer).values(data)
  const newData = await query.returning()
  
  return NextResponse.json(newData)
}
