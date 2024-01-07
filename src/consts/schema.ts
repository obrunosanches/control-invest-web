import { AccountTypeProps } from '@/types/schema'

export const ACCOUNTS_TYPES_SEEDS: AccountTypeProps[] = [
  { description: 'Conta Corrente' },
  { description: 'Conta Digital' },
  { description: 'Carteira' }
]

export const ACCOUNTS_SEEDS = [
  {
    name: 'Itaú',
    initialBalance: '9428.08',
    balance: '9428.08',
    relationWith: ACCOUNTS_TYPES_SEEDS[0].description
  },
  {
    name: 'Nubank',
    initialBalance: '4961.41',
    balance: '4961.41',
    relationWith: ACCOUNTS_TYPES_SEEDS[1].description
  },
  {
    name: 'Carteira',
    initialBalance: '0',
    balance: '0',
    relationWith: ACCOUNTS_TYPES_SEEDS[2].description
  }
]

export const CATEGORY_TYPES_SEEDS = {
  expenses: 'expenses',
  earnings: 'earnings',
  expenses_transfer: 'expenses-transfer',
  earnings_transfer: 'earnings-transfer'
}

export const CATEGORIES_SEEDS = [
  { name: 'Alimentação', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Carro', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Educação', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Família', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Lazer', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Casa', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Saúde', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Petshop', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Assinaturas e serviços', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Transporte', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Vestuário', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Presentes', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Pagamentos', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  { name: 'Investimentos', relationWith: CATEGORY_TYPES_SEEDS.expenses },
  
  { name: 'Benfícios', relationWith: CATEGORY_TYPES_SEEDS.earnings },
  { name: 'Extras', relationWith: CATEGORY_TYPES_SEEDS.earnings },
  { name: 'Investimentos', relationWith: CATEGORY_TYPES_SEEDS.earnings },
  
  { name: 'Despesas de transferência', relationWith: CATEGORY_TYPES_SEEDS.expenses_transfer },
  { name: 'Receitas de transferência', relationWith: CATEGORY_TYPES_SEEDS.earnings_transfer }
]

export const SUB_CATEGORIES_SEEDS = [
  { name: 'Almoço', relationWith: CATEGORIES_SEEDS[0].name },
  { name: 'Lanche', relationWith: CATEGORIES_SEEDS[0].name },
  { name: 'Trabalho', relationWith: CATEGORIES_SEEDS[0].name },
  { name: 'Restaurante', relationWith: CATEGORIES_SEEDS[0].name },
  { name: 'Padaria', relationWith: CATEGORIES_SEEDS[0].name },
  
  { name: 'Combustível', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Estacionamento', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Manutenção', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Limpeza', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Multas', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Imposto', relationWith: CATEGORIES_SEEDS[1].name },
  { name: 'Taxas', relationWith: CATEGORIES_SEEDS[1].name },
  
  { name : 'Faculdade', relationWith: CATEGORIES_SEEDS[2].name },
  { name : 'Curso', relationWith: CATEGORIES_SEEDS[2].name },
  { name : 'Certificação', relationWith: CATEGORIES_SEEDS[2].name },
  
  { name: 'Filhos', relationWith: CATEGORIES_SEEDS[3].name },
  { name: 'Pai', relationWith: CATEGORIES_SEEDS[3].name },
  
  { name: 'Cinema', relationWith: CATEGORIES_SEEDS[4].name },
  { name: 'Viagem', relationWith: CATEGORIES_SEEDS[4].name },
  { name: 'Jogos', relationWith: CATEGORIES_SEEDS[4].name },
  { name: 'Teatro', relationWith: CATEGORIES_SEEDS[4].name },
  { name: 'Show', relationWith: CATEGORIES_SEEDS[4].name },
  { name: 'Bar', relationWith: CATEGORIES_SEEDS[4].name },
  
  { name: 'Conta fixa', relationWith: CATEGORIES_SEEDS[5].name },
  { name: 'Açougue', relationWith: CATEGORIES_SEEDS[5].name },
  { name: 'Sacolão', relationWith: CATEGORIES_SEEDS[5].name },
  { name: 'Supermercado', relationWith: CATEGORIES_SEEDS[5].name },
  { name: 'Compras', relationWith: CATEGORIES_SEEDS[5].name },
  { name: 'Reparos', relationWith: CATEGORIES_SEEDS[5].name },
  
  { name: 'Academia', relationWith: CATEGORIES_SEEDS[6].name },
  { name: 'Barbearia', relationWith: CATEGORIES_SEEDS[6].name },
  { name: 'Consultas', relationWith: CATEGORIES_SEEDS[6].name },
  { name: 'Remédios', relationWith: CATEGORIES_SEEDS[6].name },
  { name: 'Exames', relationWith: CATEGORIES_SEEDS[6].name },
  
  { name: 'Saúde', relationWith: CATEGORIES_SEEDS[7].name },
  { name: 'Alimentação', relationWith: CATEGORIES_SEEDS[7].name },
  
  { name: 'Streaming', relationWith: CATEGORIES_SEEDS[8].name },
  { name: 'TV a Cabo', relationWith: CATEGORIES_SEEDS[8].name },
  { name: 'Plano funerário', relationWith: CATEGORIES_SEEDS[8].name },
  
  { name: 'Uber', relationWith: CATEGORIES_SEEDS[9].name },
  { name: 'Ônibus', relationWith: CATEGORIES_SEEDS[9].name },
  { name: 'Metrô', relationWith: CATEGORIES_SEEDS[9].name },
  
  { name: 'Roupas', relationWith: CATEGORIES_SEEDS[10].name },
  { name: 'Calçados', relationWith: CATEGORIES_SEEDS[10].name },
  
  { name: 'Cursos', relationWith: CATEGORIES_SEEDS[11].name },
  { name: 'Aniversário', relationWith: CATEGORIES_SEEDS[11].name },
  { name: 'Doação', relationWith: CATEGORIES_SEEDS[11].name },
  
  { name: 'Dívidas', relationWith: CATEGORIES_SEEDS[12].name },
  { name: 'Cartão de Crédito', relationWith: CATEGORIES_SEEDS[12].name },
  { name: 'Outros', relationWith: CATEGORIES_SEEDS[12].name },
  
  { name: 'Ações', relationWith: CATEGORIES_SEEDS[13].name },
  { name: 'Renda Fixa', relationWith: CATEGORIES_SEEDS[13].name },
  { name: 'Tesouro Direto', relationWith: CATEGORIES_SEEDS[13].name },
  { name: 'Fundos imobiliários', relationWith: CATEGORIES_SEEDS[13].name },
  { name: 'Fundos de investimento', relationWith: CATEGORIES_SEEDS[13].name }
]
