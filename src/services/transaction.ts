import { request } from '@/server/request'
import { FetchTransactionFilter } from '@/types/transcation'
import { TransactionProps } from '@/types/schema'

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

export async function createOrUpdateTransaction(transaction: TransactionProps): Promise<any> {
  const apiUrl = `/transaction${transaction.id ? `/${transaction.id}` : ''}`
  const transactionData: TransactionProps = {
    ...(transaction.id && { id: transaction.id }),
    account_id: transaction.account_id,
    category_id: transaction.category_id,
    date: transaction.date,
    description: transaction.description,
    is_active: true,
    must_ignore: false,
    note: transaction.note,
    sub_category_id: transaction.sub_category_id,
    transfer_id: transaction.transfer_id,
    type_id: transaction.type_id,
    value: transaction.value
  }
  
  try {
    const response = await request(apiUrl, {
      method: transaction.id ? 'PUT' : 'POST',
      body: JSON.stringify(transactionData)
    })
    
    return await response.json()
  } catch (error) {
    console.error(error)
  }
}

export async function deleteTransaction(transaction: number){
  try {
    await request(`/transaction/${transaction}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}