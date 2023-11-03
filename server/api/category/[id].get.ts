import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  return prisma.category.findMany({
    where: {
      typeId: event.context.params.id
    }
  })
})