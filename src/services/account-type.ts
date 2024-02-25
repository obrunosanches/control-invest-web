import { request } from '@/server/request'

export async function fetchAccountTypes(): Promise<any> {
  try {
    const response = await request('/account-type', { cache: 'no-store' })

    return await response.json()
  } catch (error) {
    console.error(error)
  }
}