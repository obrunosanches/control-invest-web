import { prisma } from '~/server/database/connect'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  return prisma.account.create({ data: body })
})