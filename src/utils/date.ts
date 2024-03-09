import { firstLetterUppercase } from '@/utils/srting'

interface FormatDate {
  date: string | number | Date
  locale?: string
  formatOptions?: Intl.DateTimeFormatOptions
}

export const formatDate = ({ date, formatOptions, locale = 'pt-BR' }: FormatDate) => {
  return new Date(date).toLocaleDateString(locale, formatOptions)
}

export const YEARS = Array.from({ length: 99 }, (_, index) => (index+1) + 2000)

export const monthsByLocale = (locale = 'pt-BR') => [...Array(12).keys()].map(index => {
  const month = formatDate({
    date: new Date(1990, index),
    formatOptions: { month: "short" },
    locale
  })
  
  return firstLetterUppercase(month).replace('.', '')
})