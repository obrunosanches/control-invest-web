import { type NextRequest, NextResponse } from 'next/server'

import { db } from '@/database/connect'
import { createInsertSchema } from 'drizzle-zod'
import { category } from '@/database/schema'

export async function GET() {
  const result = await db.query.category.findMany({
    with: {
      type: true,
      subCategories: true
    }
  })
  
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const data = createInsertSchema(category).parse(body)
  
  const query = db.insert(category).values(data)
  const newData = await query.returning()
  
  return NextResponse.json(newData[0], { status: 201 })
}