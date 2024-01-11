import { NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq} from 'drizzle-orm'

import { db } from '@/database/connect'
import { category } from '@/database/schema'

export async function GET(_: NextRequest, context: Context) {
  const typeId = Number(context.params.id)
  
  const query = db.select().from(category).where(eq(category.type_id, typeId))
  const result = await query.execute()
  
  return NextResponse.json(result)
}
