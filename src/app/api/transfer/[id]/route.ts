import { type NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq } from 'drizzle-orm'

import { db } from '@/database/connect'
import { transfer } from '@/database/schema'

export async function DELETE(_: NextRequest, context: Context) {
  const transferId = Number(context.params.id)
  
  const query = db.delete(transfer).where(eq(transfer.id, transferId))
  const data = await query.returning()
  
  return NextResponse.json({ id: data[0].id }, { status: 200 })
}
