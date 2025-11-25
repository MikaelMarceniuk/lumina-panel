import { Input } from '@/components/ui/input'
import { useStore } from '../providers/store.provider'

export const StoreFilter = () => {
  const { q, handleQueryChange } = useStore()

  return (
    <div>
      <Input
        placeholder="Buscar por nome or gerente..."
        className="max-w-96"
        value={q}
        onChange={(e) => handleQueryChange(e.target.value)}
      />
    </div>
  )
}
