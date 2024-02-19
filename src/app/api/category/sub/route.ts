import { type NextRequest, NextResponse } from 'next/server'

import { createInsertSchema } from 'drizzle-zod'
import { category, subCategory } from '@/database/schema'
import { db } from '@/database/connect'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const data = createInsertSchema(subCategory).parse(body)
  
  const query = db.insert(subCategory).values(data)
  const newData = await query.returning()
  
  return NextResponse.json(newData[0], { status: 201 })
}