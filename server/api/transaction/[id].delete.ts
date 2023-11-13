import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  return prisma.transaction.delete({
    where: {
      id: event.context.params.id
    }
  })
})