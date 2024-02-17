import { PageActions } from '@/types/pages'

export type SheetTitleForm = {
  prefix?: string
  title?: string
}

export const GenerateSheetTitleForm = ({ prefix, title }: SheetTitleForm): Record<PageActions, string> => ({
  earning: `${prefix} receita`,
  edit: `Editar ${title}`,
  expense: `${prefix} despesa`,
  new: `Nova ${title}`,
  remove: `Remover ${title}`,
  transaction: `${prefix} transação`
})