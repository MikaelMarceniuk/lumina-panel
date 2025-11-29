import { useState } from 'react'

type DetailsPageMode = 'read' | 'update'

export type UseDetailsPageModeReturn = {
  mode: DetailsPageMode
  isReadMode: boolean
  changeModeHandler: (mode: DetailsPageMode) => void
}

export const useDetailsPageMode = () => {
  const [mode, setMode] = useState<DetailsPageMode>('read')
  const isReadMode = mode == 'read'

  const changeModeHandler = (mode: DetailsPageMode) => setMode(mode)

  return {
    mode,
    isReadMode,
    changeModeHandler,
  }
}
