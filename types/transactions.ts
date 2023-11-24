import type { Transfer } from "@prisma/client"

export interface FormValues {
  value: string
  date: string
  accountId: string
  description: string
  note: string
  categoryId: string
  subCategoryId: string
  transfer: Transfer
}
