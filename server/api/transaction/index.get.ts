import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  const query = getQuery(event)
  
  const initialDate = new Date(query.year, query.month, 1).setUTCHours(0, 0, 0, 0)
  const finishDate = new Date(query.year, Number(query.month) + 1, 0).setUTCHours(23, 59, 59, 999)
  
  const filters: { date: Object } = {
    date: {
      gte: new Date(initialDate),
      lte: new Date(finishDate)
    }
  }
  
  return prisma.transaction.findMany({
    where: filters,
    include: {
      account: true
    }
  })
})