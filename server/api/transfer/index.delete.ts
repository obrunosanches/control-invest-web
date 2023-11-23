import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  prisma.transfer.delete({
    where: {
      id: event.context.params.id
    }
  })
})