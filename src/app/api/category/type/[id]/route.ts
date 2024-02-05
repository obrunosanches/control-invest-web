import { NextRequest, NextResponse } from 'next/server'
import type { Context } from '@/types/api'

import { eq} from 'drizzle-orm'

import { db } from '@/database/connect'
import { category } from '@/database/schema'

export async function GET(_: NextRequest, context: Context) {
  const typeId = Number(context.params.id)
  
  const result = await db.query.category.findMany({
    with: {
      type: true,
      subCategories: true
    },
    where: eq(category.type_id, typeId)
  })
  
  return NextResponse.json(result)
}
