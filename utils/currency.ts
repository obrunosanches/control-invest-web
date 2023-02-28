export const formatCurrency = ({
  value,
  locale = 'pt-BR',
  formatOptions = { style: 'currency', currency: 'BRL' }
}: {
  value: number,
  locale?: string,
  formatOptions?: Intl.NumberFormatOptions
}) => {
  return new Intl.NumberFormat(locale, {style: 'currency', currency: 'BRL'}).format(value)
}