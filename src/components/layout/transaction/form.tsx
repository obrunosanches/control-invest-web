'use client'

import type { AccountProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'
import { CardFooter } from '@/components/ui/card'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'

interface TrasactinoFormProps {
  formData: any
  handleAction: (
    formAction: FormActions,
    formData?: AccountProps
  ) => void
}

function TransactionForm({ handleAction }: TrasactinoFormProps) {
  const form = useForm()
  
  function onSubmit(values: any) {}
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CardFooter className="flex gap-4 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => handleAction('cancel')}
          >
            Cancelar
          </Button>
          
          <Button type="submit">
            Confirmar
          </Button>
        </CardFooter>
      </form>
    </Form>
  )
}

export default TransactionForm
