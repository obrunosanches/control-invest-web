'use client'

import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { CalendarIcon } from 'lucide-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import type { TransactionWithRelationsProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'
import type { TransactionOptions } from '@/types/database'

import { cn } from '@/lib/utils'
import { useCIStore } from '@/hooks/control-invest-store-provider'
import { useSheetStore } from '@/store/sheet-store'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Textarea } from '@/components/ui/textarea'

interface TransactionFormProps {
  slug: TransactionOptions
  formData: any
  handleAction: (
    formAction: FormActions,
    formData?: FormDataTransaction
  ) => void
}

const formSchema = z.object({
  slug: z.string(),
  value: z.string().min(1, 'Informe um valor válido'),
  date: z.date({ required_error: 'Selecione uma data' }),
  accountId: z.string().min(1, 'Informe uma conta válida'),
  description: z.string().min(1, 'Informe uma descrição válida'),
  note: z.string().optional(),
  categoryId: z.string().optional(),
  subCategoryId: z.string().optional(),
  accountFromId: z.string().optional(),
  accountToId: z.string().optional()
}).superRefine((schema, ctx) => {
  if (!schema.categoryId && schema.slug !== 'transfer') {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["categoryId"],
      message: 'Informe uma categoria válida',
    })
  }
  
  if (!schema.subCategoryId && schema.slug !== 'transfer') {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["subCategoryId"],
      message: 'Informe uma sub categoria válida',
    })
  }
  
  if (!schema.accountFromId && schema.slug === 'transfer') {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["accountFromId"],
      message: 'Informe uma conta de origem válida',
    })
  }
  
  if (!schema.accountToId && schema.slug === 'transfer') {
    return ctx.addIssue({
      code: z.ZodIssueCode.custom,
      path: ["accountToId"],
      message: 'Informe uma conta de destino válida',
    })
  }
})

export type FormDataTransaction = z.infer<typeof formSchema>

function TransactionForm({ handleAction, slug }: TransactionFormProps) {
  const { accounts, categories, getters } = useCIStore((store) => store)
  const selected = useSheetStore((store) => store.sheet.selected as TransactionWithRelationsProps)
  
  const [loading, setLoading] = useState(false)
  const form = useForm<FormDataTransaction>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: selected.value ?? '',
      date: selected.date ?? new Date(),
      accountId: String(selected.account_id ?? ''),
      description: selected.description ?? '',
      note: selected.note ?? '',
      categoryId: String(selected.category_id ?? ''),
      subCategoryId: String(selected.sub_category_id ?? ''),
      accountFromId: '',
      accountToId: '',
    }
  })
  
  const categoryId = useWatch({ control: form.control, name: 'categoryId' })
  
  function onSubmit(values: FormDataTransaction) {
    setLoading(true)
    
    handleAction('confirm', values)
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <input {...form.register('slug', { value: slug })} type="hidden" />
        
        <Card className="mt-4">
          <CardContent className="p-6 grid gap-6">
            <div className="flex gap-4">
              <div className={cn('grid gap-4 w-full', slug !== 'transfer' ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
                <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Valor</FormLabel>
                      <FormControl>
                        <Input placeholder="Valor da transação" {...field} autoComplete="off" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data</FormLabel>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {format(field.value, "P", { locale: ptBR })}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              locale={ptBR}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {slug !== 'transfer' && (
                  <FormField
                    control={form.control}
                    name="accountId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Conta</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma conta" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {accounts.map((type) => (
                              <SelectItem key={type.id} value={type.id?.toString() ?? ''}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição" {...field} autoComplete="off" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observação</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Type your message here." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {slug !== 'transfer' && (
              <div className="grid sm:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Categoria</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione uma Categoria" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((type) => (
                              <SelectItem key={type.id} value={type.id?.toString() ?? ''}>
                                {type.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )
                  }}
                />
                
                <FormField
                  control={form.control}
                  name="subCategoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Categoria</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione uma Sub Categoria" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {getters.getSubCategoriesByCategory(Number(categoryId)).map((type) => (
                            <SelectItem key={type.id} value={type.id?.toString() ?? ''}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
            
            {slug === 'transfer' && (
              <div className="grid sm:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="accountFromId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conta de origem</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a conta de origem" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="accountToId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Conta de destino</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a conta de destino" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </CardContent>
          
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
        </Card>
      </form>
    </Form>
  )
}

export default TransactionForm
