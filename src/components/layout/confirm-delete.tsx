'use client'

import { useState } from 'react'
import { AlertTriangleIcon, Loader2Icon } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'

import type { FormActions } from '@/types/pages'

function ConfirmDelete({ item, handleAction }: {
  item: string
  handleAction: (action: FormActions) => void
}) {
  const [loading, setLoading] = useState(false)
  
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
        <Button
          type="button"
          variant="outline"
          disabled={loading}
          onClick={() => handleAction('cancel')}
        >
          Cancelar
        </Button>
        
        <Button
          type="submit"
          variant="destructive"
          disabled={loading}
          onClick={() => {
            setLoading(true)
            handleAction('confirm')
          }}
        >
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}
          Confirmar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ConfirmDelete