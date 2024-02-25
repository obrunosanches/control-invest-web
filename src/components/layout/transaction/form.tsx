'use client'

import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'

import type { AccountProps } from '@/types/schema'
import type { FormActions } from '@/types/pages'
import type { TransactionOptions } from '@/types/database'

import { cn } from '@/lib/utils'

import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface TrasactinoFormProps {
  formData: any
  handleAction: (
    formAction: FormActions,
    formData?: AccountProps
  ) => void
}

function TransactionForm({ handleAction }: TrasactinoFormProps) {
  const form = useForm()
  const transactionTypeOptionSelected: TransactionOptions = 'transfer'
  
  function onSubmit(values: any) {}
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card className="mt-4">
          <CardContent className="p-6 grid grid-rows-4 gap-6">
            <div className="flex gap-4">
              <div className={cn('grid gap-4 w-full', transactionTypeOptionSelected === 'transfer' ? 'sm:grid-cols-3' : 'sm:grid-cols-2')}>
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
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
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
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {transactionTypeOptionSelected === 'transfer' && (
                  <FormField
                    control={form.control}
                    name="account_type_id"
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
              name="initial_balance"
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
              name="initial_balance"
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
            
            <div className="grid sm:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="account_type_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoria</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma Categoria" />
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
                name="account_type_id"
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
