import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from "@/components/ui/input"

import { Card, CardContent, CardFooter } from '@/components/ui/card'

import type { AccountProps, AccountWithTypeProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

const formSchema = z.object({
  name: z.string(),
  initial_balance: z.string()
})

interface AccountFormProps {
  data: Partial<AccountProps>
  handleAction: (
    formAction: FormActions,
    data?: AccountWithTypeProps
  ) => void
}

function AccountForm({ data = {}, handleAction }: AccountFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      initial_balance: data.initial_balance?.toString()
    }
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mt-4">
          <CardContent className="p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome da conta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="initial_balance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor inicial</FormLabel>
                    <FormControl>
                      <Input placeholder="Valor inicial da conta" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          
          </CardContent>
          
          <CardFooter className="flex gap-4 justify-end">
            <Button type="button" variant="outline" onClick={() => handleAction('cancel')}>
              Cancelar
            </Button>
            
            <Button type="submit">
              Confirmar
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default AccountForm