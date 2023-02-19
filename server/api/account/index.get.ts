import { prisma } from "~/server/database/connect"

export default defineEventHandler( () => {
  return prisma.account.findMany({
    include: {
      accountType: true
    }
  })
})
