import { type NextRequest, NextResponse } from 'next/server'

import { and, gte, lte, sql } from 'drizzle-orm'
import { createInsertSchema } from 'drizzle-zod'

import { db } from '@/database/connect'
import { transaction } from '@/database/schema'
import { monthsByLocale } from '@/utils/date'

function getFilterParams(searchParams: URLSearchParams) {
  const currentDate = new Date()
  const MONTHS = monthsByLocale('en')
  const year = searchParams.get('year')
  const month = searchParams.get('month')
  const params = {
    year: currentDate.getFullYear(),
    month: MONTHS[currentDate.getMonth()],
    monthIndex: MONTHS.findIndex(item => item.toLowerCase() === MONTHS[currentDate.getMonth()])
  }
  
  const hasYearValid = Boolean(year && Number(year) && year?.length === 4)
  const hasMonthValid = Boolean(month && MONTHS.find(item => item === month))
  
  if (hasYearValid && hasMonthValid) {
    params.year = Number(year)
    params.monthIndex = MONTHS.findIndex(item => item === month)
    params.month = MONTHS[params.monthIndex]
  }
  
  const initialDate = new Date(params.year, params.monthIndex, 1).setUTCHours(0, 0, 0, 0)
  const finishDate = new Date(params.year, (params.monthIndex + 1), 0).setUTCHours(23, 59, 59, 999)
  
  return {
    initialDate,
    finishDate
  }
}

export async function GET(request: NextRequest) {
  const { initialDate, finishDate } = getFilterParams(request.nextUrl.searchParams)
  
  const result = await db.query.transaction.findMany({
    with: {
      type: true
    },
    where: and(
      gte(transaction.date, sql.raw(`'${new Date(initialDate).toISOString()}'`)),
      lte(transaction.date, sql.raw(`'${new Date(finishDate).toISOString()}'`))
    )
  })
  
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  
  const data = createInsertSchema(transaction).parse({
    ...body,
    date: new Date(body.date),
  })
  
  const query = db.insert(transaction).values(data)
  const newData = await query.returning()
  
  return NextResponse.json(newData)
}
