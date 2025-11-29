import { useDelivererDetails } from '../provider/deliverer-details.provider'

export const DelivererDetailsHeader = () => {
  const { mode } = useDelivererDetails()

  return (
    <div className="flex justify-between">
      <h1 className="text-4xl">
        {mode == 'read' ? 'Visualizando entregador' : 'Editando entregador'}
      </h1>
    </div>
  )
}
