import { useStoreDetails } from '../provider/store-details.provider'

export const StoreDetailsHeader = () => {
  const { mode } = useStoreDetails()

  return (
    <div className="flex justify-between">
      <h1 className="text-4xl">
        {mode == 'read' ? 'Visualizando Loja' : 'Editando Loja'}
      </h1>
    </div>
  )
}
