'use client'

import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { formatDate, monthsByLocale } from '@/utils/date'
import { useCallback, useState } from 'react'
import { firstLetterUppercase } from '@/utils/srting'

const DATE_FORMAT_OPTIONS = { month: 'long', year: 'numeric' } as Intl.DateTimeFormatOptions
export const BASE_BUTTON_CLASS = 'border border-2 border-purple-700 hover:border-purple-500 '+
  ' text-purple-700 text-sm text-purple-700 hover:text-purple-500 font-bold font-medium' +
  ' py-2.5 px-5 rounded-full'
 
function MonthYearSelected({ onDateSelected }: { onDateSelected: (month: string, year: string) => void }) {
  const [dateSelected, setDateSelected] = useState(new Date())
  const [dateTimeFormatOptions, setDateTimeFormatOptions] = useState<Intl.DateTimeFormatOptions>(DATE_FORMAT_OPTIONS)
  const [shouldShowSelectDateByMonth, setShouldShowSelectDateByMonth] = useState(false)
  
  const handleChangeDate = useCallback((value: number | Date) => {
    const currentDate = new Date(value)
    
    onDateSelected(
      monthsByLocale('en')[currentDate.getMonth()].toLowerCase(),
      currentDate.getFullYear().toString()
    )
  }, [onDateSelected])
  
  const handleShowMonths = useCallback(() => {
    if (!shouldShowSelectDateByMonth) {
      setDateTimeFormatOptions({ year: 'numeric' })
      setShouldShowSelectDateByMonth(prevState => !prevState)
    }
  }, [shouldShowSelectDateByMonth])
  
  const handleNavigateCurrentDate = useCallback((): void => {
    const currentDate = new Date()
    
    setDateSelected(currentDate)
    setDateTimeFormatOptions(DATE_FORMAT_OPTIONS)
    setShouldShowSelectDateByMonth(prevState => !prevState)
  }, [])
  
  const handleNavigateDate = useCallback((value: 'prev' | 'next' | null): void => {
    if (!value) {
      const currentDate = new Date()
      
      setDateSelected(currentDate)
      setDateTimeFormatOptions(DATE_FORMAT_OPTIONS)
      setShouldShowSelectDateByMonth(prevState => !prevState)
      handleChangeDate(currentDate)
      
      return void 0
    }
    
    const currentDate = dateSelected
    const newYear = value === 'next' ? currentDate.getFullYear() + 1 : currentDate.getFullYear() - 1
    const newMonth = value === 'next' ? currentDate.getMonth() + 1 : currentDate.getMonth() - 1
    const newDate = new Date(shouldShowSelectDateByMonth ? currentDate.setFullYear(newYear) : currentDate.setMonth(newMonth))
    
    setDateSelected(newDate)
    handleChangeDate(newDate)
  }, [dateSelected, handleChangeDate, shouldShowSelectDateByMonth])
  
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
            onClick={handleNavigateCurrentDate}
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
                const newDate = new Date(currentDate.setFullYear(currentDate.getFullYear(), Number(month)))
                
                setDateSelected(newDate)
                setDateTimeFormatOptions(DATE_FORMAT_OPTIONS)
                setShouldShowSelectDateByMonth(prevState => !prevState)
                handleChangeDate(newDate)
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