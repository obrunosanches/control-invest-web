import { prisma } from "~/server/database/connect"

export default defineEventHandler( (event) => {
  const { params } = event.context
  
  return prisma.category.findMany({
    where: {
      typeId: params.id
    }
  })
})
