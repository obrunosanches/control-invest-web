import { type NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { account } from '@/database/schema'

export async function GET(_: NextRequest, context: Context) {
  const accountId = Number(context.params.id)
  
  const query = db.select().from(account).where(eq(account.id, accountId))
  const result = await query.execute()
  
  return NextResponse.json(result)
}

export async function PUT(request: NextRequest, context: Context) {
  const body = await request.json()
  
  const accountId = Number(context.params.id)
  const selected = await db.query.account.findFirst({
    where: eq(account.id, accountId)
  })
  
  const data = createInsertSchema(account).parse({
    ...selected,
    ...body,
    updatedAt: new Date()
  })
  
  const query = db.update(account).set(data).where(eq(account.id, accountId))
  const newData = await query.returning()
  
  return NextResponse.json(newData)
}

export async function DELETE(_: NextRequest, context: Context) {
  const accountId = Number(context.params.id)
  
  const query = db.delete(account).where(eq(account.id, accountId))
  const data = await query.returning()
  
  return NextResponse.json({ id: data[0].id }, { status: 200 })
}
