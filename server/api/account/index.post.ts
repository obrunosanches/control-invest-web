import { Account } from '@prisma/client'

import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event): Promise<Account> => {
  const body = await readBody(event)

  const data: Pick<Account, 'name' | 'accountTypeId' | 'initialBalance'> = {
    name: body.name,
    accountTypeId: body.accountTypeId,
    initialBalance: Number(body.initialBalance),
  }

  return prisma.account.create({ data })
})
