import { AccountProps } from '@/types/schema'
import { request } from '@/server/request'

export async function createOrUpdateAccount(account: AccountProps): Promise<any> {
  const apiUrl = `/account${account.id ? `/${account.id}` : ''}`
  const accountData: AccountProps = {
    ...(account.id && { id: account.id }),
    ...(!account.id && {
      initial_balance: account.initial_balance,
      balance: account.initial_balance
    }),
    name: account.name,
    account_type_id: account.account_type_id,
  }
  
  try {
    await request(apiUrl, {
      method: account.id ? 'PUT' : 'POST',
      body: JSON.stringify(accountData)
    })
  } catch (error) {
    console.error(error)
  }
}

export async function deleteAccount(accountId: number){
  try {
    await request(`/account/${accountId}`, {
      method: 'DELETE'
    })
  } catch (error) {
    console.log(error)
  }
}