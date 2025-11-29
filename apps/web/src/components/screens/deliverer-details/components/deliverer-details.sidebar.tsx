import { Button } from '@/components/ui/button'
import { ChevronRight, PencilLine, Save, X } from 'lucide-react'
import { useDelivererDetails } from '../provider/deliverer-details.provider'

export const DelivererDetailsSidebar = () => {
  const {
    mode,
    changeModeHandler,
    tabList,
    currentTabKey,
    handleTabChange,
    isSubmitting,
    openAlertHandler,
  } = useDelivererDetails()

  return (
    <div className="flex flex-col space-y-1 pr-4">
      {tabList.map((tab) => (
        <Button
          key={tab.key}
          variant="ghost"
          className="w-full cursor-pointer justify-between"
          onClick={() => handleTabChange(tab.key)}
          type="button"
        >
          <span className="flex items-center gap-2">
            <tab.icon className="h-4 w-4" />
            {tab.title}
          </span>
          {currentTabKey == tab.key && (
            <ChevronRight className="h-4 w-4 opacity-50" />
          )}
        </Button>
      ))}

      <div className="mt-4 w-full space-y-2">
        {mode == 'read' && (
          <Button
            type="button"
            className="w-full"
            variant={'outline'}
            onClick={() => changeModeHandler('update')}
          >
            <PencilLine /> Editar
          </Button>
        )}

        {mode == 'update' && (
          <>
            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              {isSubmitting ? (
                'Salvando...'
              ) : (
                <>
                  <Save /> Salvar
                </>
              )}
            </Button>
            <Button
              type="button"
              className="w-full"
              variant={'outline'}
              onClick={openAlertHandler}
            >
              <X /> Cancelar
            </Button>
          </>
        )}
      </div>
    </div>
  )
}
