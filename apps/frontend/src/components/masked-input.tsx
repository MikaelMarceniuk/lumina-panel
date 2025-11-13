import * as React from 'react'
import { Input } from '@/components/ui/input'
import { useMaskito } from '@maskito/react'
import { availableMasks, type AvailableMaskName } from '@/lib/masks.utils'
import { maskValue } from '@/lib/formatters.utils'

export interface MaskedInputProps extends React.ComponentProps<'input'> {
  mask: AvailableMaskName
}

export const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ mask, value = '', ...props }, ref) => {
    const inputRef = useMaskito({ options: availableMasks[mask] })
    const formattedValue = React.useMemo(
      () => maskValue(String(value), mask),
      [value, mask]
    )

    return (
      <Input
        {...props}
        value={formattedValue}
        ref={(node) => {
          inputRef(node)
          if (typeof ref === 'function') ref(node)
          else if (ref)
            (ref as React.RefObject<HTMLInputElement | null>).current = node
        }}
      />
    )
  }
)

MaskedInput.displayName = 'MaskedInput'
