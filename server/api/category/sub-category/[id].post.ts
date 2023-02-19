import type { SubCategory } from '@prisma/client'

import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event): Promise<SubCategory> => {
  const body = await readBody(event)
  
  const data: Pick<SubCategory, 'name' | 'categoryId'> = {
    name: body.name,
    categoryId: body.categoryId
  }

  return prisma.subCategory.create({data})
})
