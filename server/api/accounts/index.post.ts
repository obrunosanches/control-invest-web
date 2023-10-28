import type { Account } from '@prisma/client'

import { prisma } from '~/server/database/connect'

export default defineEventHandler(async (event): Promise<Account> => {
  const data: Pick<Account, 'name' | 'accountTypeId' | 'initialBalance'> = await readBody(event)
  
  return prisma.account.create({ data })
})