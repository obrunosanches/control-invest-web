import type { CategoryProps, CategoryWithRelationsProps, SubCategoryProps, TransactionTypeProps } from '@/types/schema'
import type { FormActions, PageActions } from '@/types/pages'

import { createOrUpdateCategory, deleteCategory } from '@/services/category'
import { createOrUpdateSubCategory, deleteSubCategory } from '@/services/sub-category'
import { useSheetStore } from '@/store/sheet-store'

import CategoryForm from '@/components/layout/category/form'
import SubCategoryForm from '@/components/layout/sub-category/form'
import ConfirmDelete from '@/components/layout/confirm-delete'
import SheetForm from '@/components/layout/sheet-form'

function ContainerSheetForm({ transactionTypeSelected, onConfirm }: { transactionTypeSelected: TransactionTypeProps; onConfirm: () => void }) {
  const sheet = useSheetStore(state => state.sheet)
  const actions = useSheetStore(state => state.actions)
  
  async function handleActionCategoryForm(formAction: FormActions, formData?: CategoryProps) {
    if (formData && formAction === 'confirm') {
      const selected = sheet.selected as CategoryWithRelationsProps

      await createOrUpdateCategory({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        type_id: formData.type_id
      })
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionSubCategoryForm(formAction: FormActions, formData?: SubCategoryProps) {
    const selected = sheet.selected as SubCategoryProps
    
    if (formData && formAction === 'confirm') {
      await createOrUpdateSubCategory({
        ...(selected.id && { id: selected.id }),
        name: formData.name,
        category_id: formData.category_id
      })
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionCategoryDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteCategory(sheet.selected.id)
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  async function handleActionSubCategoryDelete(action: FormActions) {
    if (action === 'confirm') {
      await deleteSubCategory(sheet.selected.id)
      
      onConfirm()
    }
    
    actions.setSheetToggle(!sheet.toggle)
  }
  
  return (
    <SheetForm>
      {['new', 'edit' as PageActions].includes(sheet.action) && sheet.pageSource && (
        <>
          {sheet.pageSource === 'category' && (
            <CategoryForm
              transactionTypeSelected={transactionTypeSelected}
              handleAction={handleActionCategoryForm}
            />
          )}
          
          {sheet.pageSource === 'sub-category' && (
            <SubCategoryForm handleAction={handleActionSubCategoryForm} />
          )}
        </>
      )}
      
      {sheet.action === 'remove' && sheet.pageSource === 'category' && (
        <ConfirmDelete
          item={sheet.selected.name!}
          handleAction={handleActionCategoryDelete}
        />
      )}
      
      {sheet.action === 'remove' && sheet.pageSource === 'sub-category' && (
        <ConfirmDelete
          item={sheet.selected.name!}
          handleAction={handleActionSubCategoryDelete}
        />
      )}
    </SheetForm>
  )
}

export default ContainerSheetForm