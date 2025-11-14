import { TabWrapper } from '@/components/layout/tab-wrapper'
import { CreateProductTabs } from './tabs'
import { useState } from 'react'
import type { Category } from '@/types/category.type'
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/axios'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useDebounce } from '@/hooks/use-debounce.hook'
import { Spinner } from '@/components/ui/spinner'

export const CategoriesTab = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedCategories, setCategories] = useState<Category[]>([])
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 400)

  const { data, isFetching } = useQuery({
    queryKey: ['/category', debouncedQuery],
    queryFn: async () =>
      (
        await api.get<Category[]>('/category', {
          params: { q: debouncedQuery != '' ? debouncedQuery : undefined },
        })
      ).data,
  })

  return (
    <TabWrapper title={CreateProductTabs.categories.title}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={isOpen}
            className="min-w-52 justify-between"
          >
            <div className="space-x-2">
              {selectedCategories.length == 0 && 'Selecionar categoria...'}
              {selectedCategories.length > 0 &&
                selectedCategories
                  .slice(0, 2)
                  .map((c) => <Badge key={c.id}>{c.name}</Badge>)}
              {selectedCategories.length >= 3 && (
                <Badge>+ {selectedCategories.slice(2).length} categorias</Badge>
              )}
            </div>
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 justify-self-end opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandInput
              placeholder="Procurar categoria..."
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              {data?.length == 0 && (
                <CommandEmpty>
                  <span>Não existe categorias.</span>
                </CommandEmpty>
              )}
              {debouncedQuery && data?.length == 0 && (
                <CommandEmpty>
                  <span>Categoria não encontrada.</span>
                  <span>Clique Enter para criar</span>
                </CommandEmpty>
              )}
              {isFetching && (
                <CommandEmpty className="flex flex-row items-center justify-center gap-2 py-4">
                  <Spinner />
                  <span>Buscando...</span>
                </CommandEmpty>
              )}
              {!isFetching && data && data.length > 0 && (
                <CommandGroup>
                  {data?.map((c) => (
                    <CommandItem
                      key={c.id}
                      value={c.id}
                      onSelect={(categoryId) => {
                        const category = data.find((c) => c.id == categoryId)
                        if (!category) return

                        setCategories((oldVal) => {
                          const newCategoriesArray = [...oldVal]
                          const categorySelectedIndex =
                            selectedCategories.findIndex(
                              (c) => c.id == categoryId
                            )

                          if (categorySelectedIndex == -1) {
                            newCategoriesArray.push(category)
                            return newCategoriesArray
                          }

                          newCategoriesArray.splice(categorySelectedIndex, 1)
                          return newCategoriesArray
                        })
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          'mr-2 h-4 w-4',
                          selectedCategories.find(
                            (category) => category.id == c.id
                          )
                            ? 'opacity-100'
                            : 'opacity-0'
                        )}
                      />
                      {c.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </TabWrapper>
  )
}
