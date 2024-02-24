import { useState } from 'react'
import { Loader2Icon } from 'lucide-react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { AccountProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

import { useCIStore } from '@/hooks/control-invest-store-provider'
import { useSheetStore } from '@/store/sheet-store'
import { cn } from '@/lib/utils'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
  name: z.string().min(3, 'Informe um nome válido'),
  initial_balance: z.string().optional(),
  account_type_id: z.string().min(1, 'Informe um tipo de conta válido')
})

interface AccountFormProps {
  handleAction: (
    formAction: FormActions,
    formData?: AccountProps
  ) => void
}

function AccountForm({ handleAction }: AccountFormProps) {
  const store = useCIStore((store) => store)
  const sheet = useSheetStore((store) => store.sheet)
  
  const accountTypes = store.accountTypes
  const selected = sheet.selected as AccountWithTypeProps
  
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selected.name ?? '',
      initial_balance: String(selected.initial_balance ?? ''),
      account_type_id: String(selected.account_type_id ?? '')
    }
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    
    handleAction('confirm', {
      name: values.name,
      account_type_id: Number(values.account_type_id),
      initial_balance: values.initial_balance ?? ''
    })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mt-4">
          <CardContent className="p-6 grid gap-6">
            <div className={cn('grid gap-4', !selected.id ? 'sm:grid-cols-2' : '')}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da conta" {...field} autoComplete="off" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {!selected.id && (
                <FormField
                  control={form.control}
                  name="initial_balance"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor inicial</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor inicial da conta" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="account_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de conta</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um tipo de conta" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {accountTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id?.toString() ?? ''}>
                            {type.description}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => handleAction('cancel')}
              disabled={loading}
            >
              Cancelar
            </Button>
            
            <Button type="submit" disabled={loading}>
              {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
              Confirmar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default AccountForm