import { ACCOUNTS_SEEDS, ACCOUNTS_TYPES_SEEDS, CATEGORIES_SEEDS, SUB_CATEGORIES_SEEDS } from '@/consts/schema'
import { AccountProps, AccountTypeProps, CategoryProps, SubCategoryProps, TransactionTypeProps } from '@/types/schema'

export const accountTypesSeed = ACCOUNTS_TYPES_SEEDS

export const transactionTypesSeed: TransactionTypeProps[] = [
  { description: 'Despesas', slug: 'expenses' },
  { description: 'Receitas', slug: 'earnings' },
  { description: 'Despesas de transferência', slug: 'expenses-transfer' },
  { description: 'Receitas de transferência', slug: 'earnings-transfer' }
]

export const getAccountsSeed = (types: AccountTypeProps[]): AccountProps[]  => {
  const accounts: AccountProps[] = []
  
  types.forEach((type) => {
    ACCOUNTS_SEEDS
    .filter(seed => seed.relationWith === type.description)
    .map(item => {
      accounts.push({
        name: item.name,
        account_type_id: type.id!,
        initial_balance: item.initialBalance,
        balance: item.balance
      })
    })
  })
  
  return accounts
}

export const getCategorySeed = (types: TransactionTypeProps[]): CategoryProps[]  => {
  const categoriesSeed: CategoryProps[] = []
  
  types.forEach((type) => {
    CATEGORIES_SEEDS
    .filter(seed => seed.relationWith === type.slug)
    .map(item => {
      categoriesSeed.push({
        name: item.name,
        type_id: type.id!
      })
    })
  })
  
  return categoriesSeed
}

export const getSubCategorySeed = (categories: CategoryProps[]): SubCategoryProps[]  => {
  const subCategorySeed: SubCategoryProps[] = []
  
  categories.forEach(category => {
    SUB_CATEGORIES_SEEDS
    .filter(item => item.relationWith === category.name)
    .map(seed => {
      subCategorySeed.push({
        name: seed.name,
        category_id: category.id!
      })
    })
  })
  
  return subCategorySeed
}
