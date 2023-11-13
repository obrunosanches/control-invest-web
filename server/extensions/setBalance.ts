import { Prisma } from "@prisma/client"

import type { Account } from "@prisma/client"
import type { CategoryWithIncludes } from "~/store/category"
import type { TransactionWithIncludes } from "~/store/transaction"

export default Prisma.defineExtension((client) => {
  return client.$extends({
    query: {
      transaction: {
        async $allOperations({ operation, query, args }) {
          if (['create', 'update', 'delete'].includes(operation)) {
            let accountFromId = null
            let balance = 0
            
            if (operation === 'create') {
              const account = await $fetch<Account>(`/api/accounts/${args.data.accountFromId}`)
              const category = await $fetch<CategoryWithIncludes>(`/api/category/${args.data.categoryId}`)
              
              accountFromId = args.data.accountFromId
              balance = account.balance ?? 0
              
              switch (category.type.slug) {
                case 'expenses':
                  balance -= args.data.value
                  break
                
                default:
                  balance += args.data.value
              }
            }
            
            if (operation === 'update') {
              const transaction = await $fetch<TransactionWithIncludes>(`/api/transaction/${args?.where?.id}`)
              const category = await $fetch<CategoryWithIncludes>(`/api/category/${transaction.categoryId}`)
              
              accountFromId = transaction.accountFromId
              balance = transaction.accountFrom.balance ?? 0
              
              if (transaction.value !== args.data.value) {
                switch (category.type.slug) {
                  case 'expenses':
                    balance += transaction.value
                    balance -= args.data.value
                    break
                  
                  default:
                    balance -= transaction.value
                    balance += args.data.value
                }
              }
            }
            
            if (operation === 'delete') {
              const transaction = await $fetch<TransactionWithIncludes>(`/api/transaction/${args?.where?.id}`)
              const category = await $fetch<CategoryWithIncludes>(`/api/category/${transaction.categoryId}`)
              
              accountFromId = transaction.accountFromId
              balance = transaction.accountFrom.balance ?? 0
              
              switch (category.type.slug) {
                case 'expenses':
                  balance += transaction.value
                  break
                
                default:
                  balance -= transaction.value
              }
            }
            
            await client.account.update({
              where: {
                id: accountFromId
              },
              data: {
                balance
              }
            })
          }
          
          return query(args)
        }
      }
    }
  })
})