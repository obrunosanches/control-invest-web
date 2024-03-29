import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Loader2Icon } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import { useSheetStore } from '@/store/sheet-store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

import type { CategoryProps, TransactionTypeProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'

const formSchema = z.object({
  name: z.string().min(3, 'Informe uma categoria válida')
})

interface CategoryFormProps {
  transactionTypeSelected: TransactionTypeProps
  handleAction: (
    formAction: FormActions,
    formData?: CategoryProps
  ) => void
}

function CategoryForm({ transactionTypeSelected, handleAction }: CategoryFormProps) {
  const selected = useSheetStore(state => state.sheet.selected) as CategoryProps
  
  const [loading, setLoading] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: selected.name ?? ''
    }
  })
  
  function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true)
    
    handleAction('confirm', {
      name: values.name,
      type_id: transactionTypeSelected.id!
    })
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mt-4">
          <CardContent className="p-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome da categoria" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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

export default CategoryForm