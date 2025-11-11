import { Plus } from 'lucide-react'
import { Button } from '../../ui/button'
import { CreateCustomerDialog } from './create-customer.dialog'

export const CustomerScreen = () => {
  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-4xl">Clientes</h1>
        <CreateCustomerDialog>
          <Button>
            <Plus />
            Criar Cliente
          </Button>
        </CreateCustomerDialog>
      </div>
    </main>
  )
}
