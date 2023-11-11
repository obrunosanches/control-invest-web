import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  return prisma.account.findUnique({
    where: {
      id: event.context.params.id
    }
  })
})