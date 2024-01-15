import { AlertTriangleIcon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import type { FormActions } from '@/types/pages'

function ConfirmDelete({ item, handleAction }: {
  item: string
  handleAction: (action: FormActions) => void
}) {
  return (
    <Card className="mt-4">
      <CardContent>
        <div className="flex flex-col items-center mt-6">
          <AlertTriangleIcon size={56} strokeWidth={1.5} />
          <h3 className="text-lg font-normal text-muted-foreground mt-2">
            Tem certeza que deseja excluir: {item}?
          </h3>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={() => handleAction('cancel')}>
          Cancelar
        </Button>
        
        <Button type="submit" variant="destructive" onClick={() => handleAction('confirm')}>
          Confirmar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ConfirmDelete