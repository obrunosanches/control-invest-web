import { Category } from '@prisma/client'

import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event): Promise<Category> => {
  const body = await readBody(event)

  const data: Pick<Category, 'name' | 'typeId'> = {
    name: body.name,
    typeId: body.typeId,
  }

  return prisma.category.create({ data })
})
