import { useCIStore } from '@/hooks/control-invest-store-provider'
import CardCurrencyValue from '@/components/layout/card-currency-value'

function ResultsByMonth() {
  const store = useCIStore((store) => store)
  
  const balance = store.getters.getAccountBalance()
  const earnings = store.getters.getTransactionBalanceByType('earnings')
  const expenses = store.getters.getTransactionBalanceByType('expenses')
  const globalBalance = earnings - expenses
  
  return (
    <section className="w-full mt-8">
      <div className="flex gap-4 font-bold text-gray-500">
        {store.accounts.map(account => (
          <CardCurrencyValue
            key={account.name}
            title={account.name}
            value={Number(account.balance)}
            layout="inline"
          />
        ))}
      </div>
      
      <div className="flex gap-4 mt-4">
        <CardCurrencyValue title="Saldo Atual" value={balance} />
        <CardCurrencyValue title="Receitas" value={earnings} />
        <CardCurrencyValue title="Despesas" value={expenses} />
        <CardCurrencyValue title="Balanço mensal" value={globalBalance} />
      </div>
    </section>
  )
}

export default ResultsByMonth