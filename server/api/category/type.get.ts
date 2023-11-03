import { prisma } from "~/server/database/connect"

export default defineEventHandler(() => {
  return prisma.categoryType.findMany()
})
