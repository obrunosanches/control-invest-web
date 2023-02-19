import { prisma } from "~/server/database/connect"

export default defineEventHandler( (event) => {
  const { params } = event.context
  
  return prisma.subCategory.findMany({
    where: {
      categoryId: params.id
    }
  })
})
