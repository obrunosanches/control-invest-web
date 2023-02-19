import type { Transaction } from "@prisma/client"

import { prisma } from "~/server/database/connect"
import { excludeFieldsToSave } from "~/types"

export default defineEventHandler(async (event): Promise<Transaction> => {
  const body = await readBody(event)
  
  const data: Omit<Transaction, excludeFieldsToSave> = {
    accountId: body.accountId,
    categoryId: body.categoryId,
    categoryTypeId: body.categoryTypeId,
    date: new Date(body.date),
    description: body.description,
    subCategoryId: body.subCategoryId,
    value: parseFloat(body.value),
    isActive: true,
    mustIgnore: false
  }
  
  return prisma.transaction.create({ data })
})
