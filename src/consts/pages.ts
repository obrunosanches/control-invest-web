import { PageActions } from '@/types/pages'

export const GetFormActionTitles = ({ prefix, page }: { prefix?: string; page?: string }): Record<PageActions, string> => ({
  earning: `${prefix} receita`,
  edit: `Editar ${page}`,
  expense: `${prefix} despesa`,
  new: `Nova ${page}`,
  remove: `Remover ${page}`,
  transaction: `${prefix} transação`
})