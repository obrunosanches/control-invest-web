import { defineStore } from "pinia"

import type { Account, Transfer } from "@prisma/client"

export interface TransferWithIncludes extends Transfer {
  accountFrom: Account
  accountTo: Account
}

interface State {
  transfers: TransferWithIncludes[]
}

export const useTransferStore = defineStore('transferStore', {
  state: (): State => ({
    transfers: []
  }),
  actions: {
    async createTransfer(transfer: Transfer) {
      try {
        const apiUrl = `/api/transfer${transfer.id ? `/${transfer.id}` : ''}`
        
        return await $fetch(apiUrl, {
          method: transfer.id ? 'PUT' : 'POST',
          body: {
            accountFromId: transfer.accountFromId,
            accountToId: transfer.accountToId
          }
        })
      } catch (error) {
        console.error(error)
      }
    },
    async deleteTransfer(transferId: string) {
      try {
        await $fetch(`/api/transfer/${transferId}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})