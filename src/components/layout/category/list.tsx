'use client'

import { ChevronsUpDownIcon } from 'lucide-react'
import * as Accordion from '@radix-ui/react-accordion'

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import PageActionButtons from '@/components/layout/page-action-buttons'
import { useCIStore } from '@/hooks/control-invest-store-provider'

interface CategoryListProps {}

function CategoryList({}: CategoryListProps) {
  const categories = useCIStore(store => store.categories)
  
  return (
    <div className="mt-6">
      {categories.map((category) => {
        const { subCategories } = category
        
        return (
          <div key={category.id} className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 mt-2">
            <Accordion.Root type="multiple" className="w-full">
              <Accordion.Item value={`${category.id}-${category.name}`}>
                <Accordion.Header>
                  <div className="flex gap-2">
                    <span className="flex items-center flex-auto">
                      {category.name}
                    </span>
                    
                    <PageActionButtons
                      selected={category}
                      sheetTitle="categoria"
                      sheetTitleNew="sub categoria"
                    />
                    
                    <Accordion.Trigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                      >
                        <ChevronsUpDownIcon strokeWidth={1.5} size={20} />
                      </Button>
                    </Accordion.Trigger>
                  </div>
                </Accordion.Header>
                
                <Accordion.Content>
                  <div className="rounded-md border mt-4">
                    <Table>
                      <TableBody>
                        {subCategories.map(subCategory => {
                          return (
                            <TableRow key={subCategory.id}>
                              <TableCell>{subCategory.name}</TableCell>
                              <TableCell className="w-32">
                                <PageActionButtons
                                  selected={subCategory}
                                  sheetTitle="sub categoria" showButtons={['edit', 'remove']}
                                />
                              </TableCell>
                            </TableRow>
                          )
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        )
      })}
    </div>
  )
}

export default CategoryList