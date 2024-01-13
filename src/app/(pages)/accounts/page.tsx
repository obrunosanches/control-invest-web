import { BadgeDollarSignIcon, PenSquare, PlusCircleIcon, Trash2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

import { formatCurrency } from '@/utils/currency'
import { request } from '@/server/request'

import type { AccountWithTypeProps } from '@/types/schema'

async function getAccount(): Promise<AccountWithTypeProps[]> {
  const response = await request('/account', {
    cache: 'no-store'
  })
  return await response.json()
}

export default async function Accounts() {
  const accounts = await getAccount()
  
  return (
    <>
      <h1 className="text-3xl font-bold">
        Contas
      </h1>
      
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
                    <Button variant="ghost" size="icon">
                      <PenSquare strokeWidth={1.5} color="#3B82F6" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2Icon strokeWidth={1.5} color="#DC2626" />
                    </Button>
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
                <div className="flex w-full">
                  <div className="flex basis-1/3">
                    <Button variant="ghost">
                      <PlusCircleIcon strokeWidth={1} color="#22C55E" className="mr-2" />
                      <span className="font-light">
                        Receitas
                      </span>
                    </Button>
                  </div>
                  <div className="flex basis-1/3">
                    <Button variant="ghost">
                      <PlusCircleIcon strokeWidth={1} color="#DC2626" className="mr-2" />
                      <span className="font-light">
                        Despesas
                      </span>
                    </Button>
                  </div>
                  <div className="flex basis-1/3">
                    <Button variant="ghost">
                      <BadgeDollarSignIcon strokeWidth={1} color="#64748B" className="mr-2" />
                      <span className="font-light">
                        Transações
                      </span>
                    </Button>
                  </div>
                </div>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </>
  )
}
