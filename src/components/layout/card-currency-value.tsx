import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/currency'

import type { ComponentProps } from 'react'

interface CardCurrencyValueProps extends ComponentProps<'div'> {
  title: string
  value: number
  layout?: 'inline' | 'column'
}

function CardCurrencyValue({ title, value, layout = 'column', className }: CardCurrencyValueProps) {
  const cardClassName = cn("flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl", className)
  const cardLayout = cn("items-center p-4", layout === 'inline' ? "flex gap-1" : "flex-col gap-y-9")
  
  return (
    <div className={cardClassName}>
      <div className={cardLayout}>
        <span className="block text-gray-500 font-medium">
          {`${title} >`}
        </span>
        
        <span className={cn(
          "block text-xl font-bold",
          value < 0 ? 'text-red-500' : '',
          layout === 'column' && "mt-2"
        )}>
          {formatCurrency({ value })}
        </span>
      </div>
    </div>
  )
}

export default CardCurrencyValue