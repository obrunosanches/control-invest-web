'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageActionButtons from '@/components/layout/page-action-buttons'

import { formatCurrency } from '@/utils/currency'
import { useCIStore } from '@/hooks/control-invest-store-provider'

interface AccountListProps {}

function AccountList({}: AccountListProps) {
  const accounts = useCIStore((store) => store.accounts)
  
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-6">
      {accounts.map(account => {
        return (
          <Card key={account.id}>
            <CardHeader>
              <div className="flex">
                <div className="flex-auto">
                  <CardTitle className="font-medium">
                    {account.name}
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    {account.type.description}
                  </CardDescription>
                </div>
                
                <div className="flex gap-2">
                  <PageActionButtons
                    showButtons={['edit', 'remove']}
                    sheetTitle="conta"
                    selected={account}
                    pageSource="account"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex-auto">
                <span className="text-card-foreground font-medium">
                  Saldo atual:
                  <span className="text-green-500 ml-2">
                    {formatCurrency({ value: Number(account.balance) })}
                  </span>
                </span>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between w-full">
                <PageActionButtons
                  showButtons={['earning', 'expense', 'transaction']}
                  sheetTitle="conta"
                  selected={account}
                  pageSource="account"
                />
              </div>
            </CardFooter>
          </Card>
        )
      })}
    </div>
  )
}

export default AccountList