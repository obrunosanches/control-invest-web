import { request } from '@/server/request'

export async function fetchTransactionType(): Promise<any> {
  try {
    const response = await request('/transaction-type', { cache: 'no-store' })
    
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}