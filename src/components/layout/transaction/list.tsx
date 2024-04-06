import { CircleCheckBig } from 'lucide-react'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { formatDate } from '@/utils/date'
import { formatCurrency } from '@/utils/currency'
import { cn } from '@/lib/utils'

import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import PageActionButtons from '@/components/layout/page-action-buttons'

function TransactionList() {
  const transactions = useCIStore(store => store.transactions)
  
  return (
    <Table className="bg-white rounded-2xl">
      <TableHeader className="bg-slate-200/60">
        <TableRow>
          <TableHead className="w-20 px-3 py-4">Situação</TableHead>
          <TableHead className="w-28 px-3 py-4">Data</TableHead>
          <TableHead className="px-3 py-4">Valor</TableHead>
          <TableHead className="px-3 py-4">Descrição</TableHead>
          <TableHead className="px-3 py-4">Catecoria</TableHead>
          <TableHead className="px-3 py-4">Sub Catecoria</TableHead>
          <TableHead className="px-3 py-4">Conta</TableHead>
          <TableHead className="w-32 px-3 py-4">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map(transaction => {
          return (
            <TableRow key={transaction.id}>
              <TableCell>
                <CircleCheckBig size={20} strokeWidth={1.5} color={transaction.is_active ? '#22C55E' : 'currentColor'} />
              </TableCell>
              <TableCell>
                {formatDate({ date: transaction.date })}
              </TableCell>
              <TableCell className={cn([
                transaction.type.slug.includes('earnings') && 'text-green-500',
                transaction.type.slug.includes('expenses') && 'text-red-500'
              ])}>
                {formatCurrency({ value: Number(transaction.value) })}
              </TableCell>
              <TableCell>
                {transaction.description}
              </TableCell>
              <TableCell>
                {transaction.category.name}
              </TableCell>
              <TableCell>
                {transaction.subCategory.name}
              </TableCell>
              <TableCell>
                {transaction.account.name}
              </TableCell>
              <TableCell className="w-32">
                <PageActionButtons
                  selected={transaction}
                  sheetTitle="transação"
                  showButtons={['edit', 'remove']}
                  pageSource="transaction"
                />
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={8}></TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default TransactionList