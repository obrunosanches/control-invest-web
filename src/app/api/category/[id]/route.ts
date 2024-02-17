import { type NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { category } from '@/database/schema'

export async function GET(_: NextRequest, context: Context) {
  const categoryId = Number(context.params.id)
  
  const result = await db.query.category.findMany({
    where: (eq(category.id, categoryId)),
    with: {
      type: true,
      subCategories: true
    }
  })
  
  return NextResponse.json(result)
}

export async function PUT(request: NextRequest, context: Context) {
  const body = await request.json()
  
  const categoryId = Number(context.params.id)
  const selected = await db.query.category.findFirst({
    where: eq(category.id, categoryId)
  })
  
  const data = createInsertSchema(category).parse({
    ...selected,
    ...body,
    updated_at: new Date()
  })
  
  const query = db.update(category).set(data).where(eq(category.id, categoryId))
  const newData = await query.returning()
  
  return NextResponse.json(newData[0], { status: 201 })
}

export async function DELETE(_: NextRequest, context: Context) {
  const categoryId = Number(context.params.id)
  
  const query = db.delete(category).where(eq(category.id, categoryId))
  const data = await query.returning()
  
  return NextResponse.json({ id: data[0].id }, { status: 200 })
}
