import { request } from '@/server/request'
import { FetchTransactionFilter } from '@/types/transcation'

export async function fetchTransactions(filter: FetchTransactionFilter): Promise<any> {
  const currentDate = new Date()
  const params = new URLSearchParams()
  
  params.append('month', filter.month ?? currentDate.getMonth().toString())
  params.append('year', filter.year ?? currentDate.getFullYear().toString())
  
  try {
    const response = await request(`/transaction?${params.toString()}`, { cache: 'no-store' })
    
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}