import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event) => {
  return prisma.account.delete({
    where: {
      id: event.context.params.id
    }
  })
})
