import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { Button } from './ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from './ui/command'
import { Badge } from './ui/badge'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { cn } from '@/lib/utils'

export type MultiSelectValue<T extends string> = T[]

export type MultiSelectData = { id: string; name: string }

type MultiSelectProps = {
  data: MultiSelectData[]
  placeholder: string
  itemLabel: {
    singular: string
    plural: string
  }
  value: MultiSelectData[]
  onChangeHandler: (value: MultiSelectData[]) => void
  disabled?: boolean
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  data,
  placeholder,
  itemLabel,
  value,
  onChangeHandler,
  disabled,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const debounceQuery = useDebounce(query, 400)

  const remaining = value.slice(2).length
  const label = remaining === 1 ? itemLabel.singular : itemLabel.plural

  const renderContent = (): React.ReactNode => {
    // quando não há query e não há resultados
    if (!debounceQuery && data.length === 0) {
      return (
        <CommandEmpty>
          <span>Não existem {itemLabel.plural}.</span>
        </CommandEmpty>
      )
    }

    // quando há query e não há resultados
    if (debounceQuery && data.length === 0) {
      return (
        <CommandEmpty className="flex flex-col items-center justify-center py-4">
          <span>{itemLabel.singular} não encontrada.</span>
          <span>Clique Enter para criar</span>
        </CommandEmpty>
      )
    }

    // quando há items para mostrar
    if (data && data.length > 0) {
      const selectedIds = new Set(value.map((v) => v.id))
      return (
        <CommandGroup>
          {data.map((c) => {
            const isSelected = selectedIds.has(c.id)
            const itemValue = `${c.id}::${c.name}`
            return (
              <CommandItem
                key={c.id}
                value={itemValue}
                onSelect={(rawValue: string) => {
                  const [id] = rawValue.split('::')
                  const alreadySelected = value.some((v) => v.id === id)

                  if (alreadySelected) {
                    onChangeHandler(value.filter((v) => v.id !== id))
                    return
                  }

                  const item = data.find((d) => d.id === id)
                  if (!item) return

                  onChangeHandler([...value, item])
                }}
              >
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    isSelected ? 'opacity-100' : 'opacity-0'
                  )}
                />
                {c.name}
              </CommandItem>
            )
          })}
        </CommandGroup>
      )
    }

    // fallback explícito (evita retornar undefined)
    return null
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={isOpen}
          className="min-w-52 justify-between"
          disabled={disabled}
        >
          <div className="space-x-2">
            {value.length == 0 && placeholder}
            {value.length > 0 &&
              value.slice(0, 2).map((c) => <Badge key={c.id}>{c.name}</Badge>)}
            {remaining > 0 && (
              <Badge>
                + {remaining} {label}
              </Badge>
            )}
          </div>
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 justify-self-end opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput
            placeholder={placeholder}
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>{renderContent()}</CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
