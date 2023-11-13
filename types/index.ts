export type TransactionTypeSlug = 'expenses' | 'earnings' | 'expenses-transfer' | 'earnings-transfer'

export type ItemActionType = 'create' | 'update' | 'delete'

export interface DateSelected {
  month: string
  year: string
}