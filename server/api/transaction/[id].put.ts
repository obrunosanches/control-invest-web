import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return prisma.transaction.update({
    where: {
      id: event.context.params.id
    },
    data: body
  })
})