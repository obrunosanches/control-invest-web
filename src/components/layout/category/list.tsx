'use client'

import type { PageActions } from '@/types/pages'
import type { CategoryWithRelationsProps } from '@/types/schema'
import { useAppStore } from '@/store'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

interface CategoryListProps {
  handleAction: (
    action: PageActions,
    selected: CategoryWithRelationsProps
  ) => void
}
function CategoryList({ handleAction }: CategoryListProps) {
  const { state: { categories } } = useAppStore()
  
  return (
    <div className="grid grid-cols-2 grid-rows-1 gap-4 mt-6">
      {categories.map(category => {
        return (
          <Card key={category.id}>
            <CardHeader>
              <div className="flex">
                <div className="flex-auto">
                  <CardTitle className="font-medium">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="mt-0.5">
                    {category.type.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        )
      })}
    </div>
  )
}

export default CategoryList