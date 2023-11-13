import { prisma } from "~/server/database/connect"

export default defineEventHandler(() => {
  return prisma.transactionType.findMany({
    orderBy: {
      description: 'asc'
    }
  })
})
