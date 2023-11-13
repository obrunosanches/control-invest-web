import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  return prisma.transaction.findUnique({
    where: {
      id: event.context.params.id
    },
    include: {
      type: true,
      category: true,
      subCategory: true,
      accountFrom: true,
      accountTo: true
    }
  })
})