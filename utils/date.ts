export const formatDate = ({
  date,
  locale = 'pt-BR',
  formatOptions = {}
}: {
  date: string | number | Date,
  locale?: string,
  formatOptions?: Intl.DateTimeFormatOptions
}) => {
  const myDate = new Date(date)

  return myDate.toLocaleDateString(locale, formatOptions)
}