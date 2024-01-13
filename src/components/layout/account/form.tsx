import { SheetFooter } from '@/components/ui/sheet'
import { AccountWithTypeProps } from '@/types/schema'
import { Button } from '@/components/ui/button'

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000))

function AccountForm({ account, handleSubmit }: { account: Partial<AccountWithTypeProps>; handleSubmit: (data: boolean) => void }) {
  console.log('account', account)
  return (
    <form onSubmit={(event) => {
      wait().then(() => handleSubmit(false));
      event.preventDefault();
    }}>
      <div className="p-6">
        <div className="flex gap-4">
          <div className="p-6">
            <div className="flex gap-4">
              <input name="name" />
              <input name="initial_balance" />
            </div>
            <div className="mt-6">
              <select>
                <option>Selecione o tipo</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <SheetFooter>
        <Button type="submit">Confirmar</Button>
      </SheetFooter>
    </form>
  )
}

export default AccountForm