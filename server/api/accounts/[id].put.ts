import { prisma } from "~/server/database/connect"

import type { Account } from "@prisma/client"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return prisma.account.update({
    where: {
      id: event.context.params.id
    },
    data: body
  })
})
