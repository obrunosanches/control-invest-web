import { PageActions } from '@/types/pages'

export type FormActionTitles = {
  prefix?: string
  page?: string
}

export const GetFormActionTitles = ({ prefix, page }: FormActionTitles): Record<PageActions, string> => ({
  earning: `${prefix} receita`,
  edit: `Editar ${page}`,
  expense: `${prefix} despesa`,
  new: `Nova ${page}`,
  remove: `Remover ${page}`,
  transaction: `${prefix} transação`
})