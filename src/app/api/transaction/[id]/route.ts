import { type NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { transaction } from '@/database/schema'

export async function GET(_: NextRequest, context: Context) {
  const transactionId = Number(context.params.id)
  
  const result = await db.query.transaction.findMany({
    where: eq(transaction.id, transactionId),
    with: {
      type: true,
      category: true,
      subCategory: true,
      account: true,
      transfer: true
    }
  })
  
  return NextResponse.json(result)
}

export async function PUT(request: NextRequest, context: Context) {
  const body = await request.json()
  
  const transactionId = Number(context.params.id)
  const selected = await db.query.transaction.findFirst({
    where: eq(transaction.id, transactionId)
  })
  
  const data = createInsertSchema(transaction).parse({
    ...selected,
    ...body,
    date: new Date(body.date ?? selected?.date),
    updated_at: new Date()
  })
  
  const query = db.update(transaction).set(data).where(eq(transaction.id, transactionId))
  const newData = await query.returning()
  
  return NextResponse.json(newData[0], { status: 201 })
}

export async function DELETE(_: NextRequest, context: Context) {
  const transactionId = Number(context.params.id)
  
  const query = db.delete(transaction).where(eq(transaction.id, transactionId))
  const data = await query.returning()
  
  return NextResponse.json({ id: data[0].id }, { status: 200 })
}
