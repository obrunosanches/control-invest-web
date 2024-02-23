'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { formatDate, monthsByLocale } from '@/utils/date'
import { useCallback, useEffect, useState } from 'react'
import { firstLetterUppercase } from '@/utils/srting'

const DATE_FORMAT_OPTIONS = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions
const BASE_BUTTON_CLASS = 'border border-2 border-purple-700 hover:border-purple-500 '+
  ' text-purple-700 text-sm text-purple-700 hover:text-purple-500 font-bold font-medium' +
  ' py-2.5 px-5 rounded-full'
 
function MonthYearSelected({ onDateSelected }: { onDateSelected: (month: string, year: string) => void }) {
  const [dateSelected, setDateSelected] = useState(new Date())
  const [dateTimeFormatOptions, setDateTimeFormatOptions] = useState<Intl.DateTimeFormatOptions>(DATE_FORMAT_OPTIONS)
  const [shouldShowSelectDateByMonth, setShouldShowSelectDateByMonth] = useState(false)
  
  const handleShowMonths = useCallback(() => {
    const options = shouldShowSelectDateByMonth
      ? DATE_FORMAT_OPTIONS
      : { year: 'numeric' } as Intl.DateTimeFormatOptions
    
    setDateTimeFormatOptions(options)
    setShouldShowSelectDateByMonth(prevState => !prevState)
  }, [shouldShowSelectDateByMonth])
  
  const handleNavigateDate = useCallback((value: 'prev' | 'next' | null): void => {
    if (!value) {
      setDateSelected(new Date())
      setDateTimeFormatOptions(DATE_FORMAT_OPTIONS)
      setShouldShowSelectDateByMonth(prevState => !prevState)
      return void 0
    }
    
    const currentDate = dateSelected
    let newDate: number
    
    if (shouldShowSelectDateByMonth) {
      const newValue = value === 'prev' ? currentDate.getFullYear() + 1 : currentDate.getFullYear() - 1
      
      newDate = currentDate.setFullYear(newValue)
    } else {
      const newValue = value === 'prev' ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1
      
      newDate = currentDate.setMonth(newValue)
    }
    
    setDateSelected(new Date(newDate))
  }, [dateSelected, shouldShowSelectDateByMonth])
  
  useEffect(() => {
    onDateSelected(
      dateSelected.getMonth().toString(),
      dateSelected.getFullYear().toString()
    )
  }, [dateSelected, onDateSelected])
  
  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <Button variant="ghost" onClick={() => handleNavigateDate('prev')}>
          <ChevronLeftIcon color="#9333ea" />
        </Button>
  
        <Button
          variant="ghost"
          className={cn(BASE_BUTTON_CLASS, shouldShowSelectDateByMonth ? 'w-32' : 'w-52')}
          onClick={handleShowMonths}
        >
          {firstLetterUppercase(
            formatDate({
              date: dateSelected,
              formatOptions: dateTimeFormatOptions
            })
          )}
        </Button>
        
        {shouldShowSelectDateByMonth && (
          <Button
            variant="ghost"
            className={BASE_BUTTON_CLASS}
            onClick={() => handleNavigateDate(null)}
          >
            Hoje
          </Button>
        )}
        
        <Button variant="ghost" onClick={() => handleNavigateDate('next')}>
          <ChevronRightIcon color="#9333ea" />
        </Button>
      </div>
      
      {shouldShowSelectDateByMonth && (
        <div className="flex justify-center items-center gap-1 overflow-y-auto mt-4">
          {Object.keys(monthsByLocale()).map(month => (
            <Button
              key={month}
              variant="ghost"
              className={BASE_BUTTON_CLASS}
              onClick={() => {
                const currentDate = dateSelected
                const newDate = currentDate.setFullYear(currentDate.getFullYear(), Number(month))
                
                setDateSelected(new Date(newDate))
                setDateTimeFormatOptions(DATE_FORMAT_OPTIONS)
                setShouldShowSelectDateByMonth(prevState => !prevState)
              }}
            >
              {monthsByLocale()[Number(month)]}
            </Button>
          ))}
        </div>
      )}
    </>
  )
}

export default MonthYearSelected