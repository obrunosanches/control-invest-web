'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import PageActionButtons from '@/components/layout/page-action-buttons'

import { formatCurrency } from '@/utils/currency'
import { useAccountStore } from '@/store/useAccountStore'

interface AccountListProps {}

function AccountList({}: AccountListProps) {
  const accounts = useAccountStore(state => state.accounts)
  
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
                    actionTitle="conta"
                    selected={account}
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
                  actionTitle="conta"
                  selected={account}
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