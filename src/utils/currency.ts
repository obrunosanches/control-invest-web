interface FormatCurrency {
  value: number
  locale?: string
  options?: Intl.NumberFormatOptions
}

export function formatCurrency({ value, locale = 'pt-BR', options = { style: 'currency', currency: 'BRL' } }: FormatCurrency) {
  return new Intl.NumberFormat(locale, options).format(value)
}