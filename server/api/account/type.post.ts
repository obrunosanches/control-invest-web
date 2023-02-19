import { AccountType } from '@prisma/client'

import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event): Promise<AccountType> => {
  const body = await readBody(event)

  const data: Pick<AccountType, 'description'> = {
    description: body.description
  }

  return prisma.accountType.create({ data })
})
