import { Input } from '@/components/ui/input'
import { useDeliverers } from '../providers/deliverer.provider'

export const DelivererFilters = () => {
  const { q, queryChangeHandler } = useDeliverers()

  return (
    <div>
      <Input
        placeholder="Buscar por nome..."
        className="max-w-96"
        value={q}
        onChange={(e) => queryChangeHandler(e.target.value)}
      />
    </div>
  )
}
