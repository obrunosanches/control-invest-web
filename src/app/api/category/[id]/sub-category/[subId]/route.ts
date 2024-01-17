import { type NextRequest, NextResponse } from 'next/server'
import type { ContextCategory } from '@/types/api'

import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { subCategory } from '@/database/schema'

export async function PUT(request: NextRequest, context: ContextCategory) {
  const body = await request.json()
  
  const subCategoryId = Number(context.params.id)
  const selected = await db.query.subCategory.findFirst({
    where: eq(subCategory.id, subCategoryId)
  })
  
  const data = createInsertSchema(subCategory).parse({
    ...selected,
    ...body,
    updated_at: new Date()
  })
  
  const query = db.update(subCategory).set(data).where(eq(subCategory.id, subCategoryId))
  const newData = await query.returning()
  
  return NextResponse.json(newData[0], { status: 200 })
}

export async function DELETE(resquest: NextRequest, context: ContextCategory) {
  const subCategoryId = Number(context.params.subId)
  
  const query = db.delete(subCategory).where(eq(subCategory.id, subCategoryId))
  const data = await query.returning()
  
  return NextResponse.json({ id: data[0].id }, { status: 200 })
}
