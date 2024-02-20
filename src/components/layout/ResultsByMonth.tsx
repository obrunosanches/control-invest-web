import { useCIStore } from '@/hooks/control-invest-store-provider'

function ResultsByMonth() {
  const store = useCIStore((store) => store)
  
  return (
    <section className="w-full mt-8">
      <div className="flex gap-4 font-bold text-gray-500">
        {store.accounts.map(account => (
          <div key={account.name} className="flex-auto w-1/4 bg-white border border-black[0.07] rounded-2xl">
            <div className="flex gap-1 items-center p-4">
              <span>{account.name}</span>
              <span className="font-medium"> {'>'} </span>
              <span className="block text-xl font-bold">
                {account.balance}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ResultsByMonth