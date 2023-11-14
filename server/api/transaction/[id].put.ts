import { prisma } from "~/server/database/connect"

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  
  const currentDate = new Date()
  const currentTimezoneOffset = currentDate.getTimezoneOffset() * 60000
  const currentDateWithoutTimezone = new Date(currentDate.valueOf() - currentTimezoneOffset)
  
  const transactionDateWithoutTimezone = new Date(body.date).toISOString().slice(0, -1)
  const transactionDate = new Date(transactionDateWithoutTimezone)
  
  return prisma.transaction.update({
    where: {
      id: event.context.params.id
    },
    data: {
      ...body,
      date: new Date(
        transactionDate.getFullYear(),
        transactionDate.getMonth(),
        transactionDate.getDate(),
        currentDateWithoutTimezone.getHours(),
        currentDateWithoutTimezone.getMinutes()
      )
    }
  })
})