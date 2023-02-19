import { CategoryType } from '@prisma/client'

import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event): Promise<CategoryType> => {
  const body = await readBody(event)

  const data: Pick<CategoryType, 'description'> = {
    description: body.description
  }

  return prisma.categoryType.create({ data })
})
