import { prisma } from "~/server/database/connect"
import type { Account } from "@prisma/client"
import type { CategoryWithIncludes } from "~/store/category"

interface SetBalance {
  accountId: number
  categoryId: number
  categoryTypeId: number
  value: number
}

const setBalance = async ({ accountId, categoryId, value }: SetBalance) => {
  const account = await $fetch<Account>(`/api/accounts/${accountId}`)
  const category = await $fetch<CategoryWithIncludes>(`/api/category/${categoryId}`)
  
  let balance = account.balance ?? 0
  
  switch (category.type.slug) {
    case 'expenses':
      balance -= value
      break
    
    default:
      balance += value
  }
  
  await prisma.account.update({
    where: {
      id: accountId
    },
    data: {
      balance
    }
  })
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  await setBalance({
    accountId: body.accountId,
    categoryId: body.categoryId,
    value: Number(body.value)
  })

  return prisma.transaction.create({
    data: body
  })
})