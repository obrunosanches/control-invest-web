interface FormateDate {
  date: string | number | Date
  locale?: string
  formatOptions?: Intl.DateTimeFormatOptions
}

export const formatDate = ({ date, locale = 'pt-BR', formatOptions = {} }: FormateDate) => {
  return new Date(date).toLocaleDateString(locale, formatOptions)
}