import { prisma } from "~/server/database/connect"

export default defineEventHandler((event) => {
  const query = getQuery(event)
  
  const initialDate = new Date(query.year, query.month, 1).setUTCHours(0, 0, 0, 0)
  const finishDate = new Date(query.year, Number(query.month) + 1, 0).setUTCHours(23, 59, 59, 999)
  
  let filters: {
    date?: Object
    typeId?: string
    transferId?: string
  } = {}
  
  if (query.month && query.year) {
    filters.date = {
      gte: new Date(initialDate),
      lte: new Date(finishDate)
    }
  }
  
  if (query.typeId) {
    filters.typeId = query.type
  }
  
  if (query.transferId) {
    filters.transferId = query.transferId
  }

  return prisma.transaction.findMany({
    where: filters,
    orderBy: {
      createdAt: 'asc'
    },
    include: {
      type: true,
      category: true,
      subCategory: true,
      account: true,
      transfer: true
    }
  })
})