import { prisma } from "~/server/database/connect"

export default defineEventHandler( async (event) => {
  const query = getQuery(event)
  const currentDate = new Date()

  const month = Number(query.month ?? currentDate.getMonth())
  const year = Number(query.year ?? currentDate.getFullYear())
  const type = String(query.type ?? '')

  const initialDate = new Date(year, month -1).setHours(-3)
  const finishDate = new Date(year, month, 0).setHours(-3)

  const filters: {date: Object, categoryTypeId?: string} = {
    date: {
      gte: new Date(initialDate),
      lte: new Date(finishDate)
    }
  }

  if (type !== '') {
    filters.categoryTypeId = type
  }

  return prisma.transaction.findMany({
    where: filters
  })
})
