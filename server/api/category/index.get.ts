import { prisma } from "~/server/database/connect"

export default defineEventHandler(() => {
  return prisma.category.findMany({
    include: {
      type: true,
    },
  })
})
