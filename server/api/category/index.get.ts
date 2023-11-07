import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  const query = getQuery(event)
  
  return prisma.category.findMany({
    where: {
      typeId: query.type
    },
    include: {
      type: true,
      subCategory: true
    }
  })
})