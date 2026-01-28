'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ChevronDown, ChevronUp, Check, Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterConfig } from '@/lib/types'

interface FilterSidebarProps {
  filters         : Array<FilterConfig>
  selectedFilters : Record<string, Array<string>>
  onToggleOption  : ( filterId: string, optionId: string ) => void
  onClearFilter   : ( filterId: string ) => void
  className?      : string
}

export function FilterSidebar( {
  filters,
  selectedFilters,
  onToggleOption,
  onClearFilter,
  className,
}: FilterSidebarProps ) {
  const t = useTranslations()
  const [ expandedFilters, setExpandedFilters ] = useState<Record<string, boolean>>(
    // Expand first 2 filters by default
    Object.fromEntries( filters.slice( 0, 2 )
      .map( ( f ) => [ f.id, true ] ) ),
  )
  const [ searchQueries, setSearchQueries ] = useState<Record<string, string>>( {} )

  const toggleExpanded = ( filterId: string ) => {
    setExpandedFilters( ( prev ) => ( {
      ...prev,
      [filterId] : !prev[filterId],
    } ) )
  }

  const updateSearchQuery = ( filterId: string, query: string ) => {
    setSearchQueries( ( prev ) => ( {
      ...prev,
      [filterId] : query,
    } ) )
  }

  return (
    <aside className={ cn( 'w-72 shrink-0', className ) }>
      <div className='sticky top-24 space-y-4'>
        <h2 className='font-serif text-lg font-semibold text-white'>
          {t( 'search.filters' )}
        </h2>

        <div className='space-y-2'>
          {
            filters.map( ( filter ) => {
              const isExpanded = expandedFilters[filter.id] ?? false
              const selectedValues = selectedFilters[filter.id] ?? []
              const searchQuery = searchQueries[filter.id] ?? ''

              // Filter options by search query
              const filteredOptions = filter.options.filter( ( opt ) => opt.label.toLowerCase()
                .includes( searchQuery.toLowerCase() ) )

              return (
                <div
                  className='overflow-hidden rounded-xl border border-white/10 bg-white/5'
                  key={ filter.id }
                >
                  {/* Filter header */}
                  <button
                    className='flex w-full items-center justify-between px-4 py-3 text-start transition-colors hover:bg-white/5'
                    onClick={
                      () => {
                        toggleExpanded( filter.id )
                      }
                    }
                    type='button'
                  >
                    <div className='flex items-center gap-2'>
                      <span className='text-sm font-medium text-white'>
                        {t( filter.name )}
                      </span>
                      {
                        0 < selectedValues.length
                          ? (
                            <span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-[hsl(var(--gold))] px-1.5 text-xs font-semibold text-black'>
                              {selectedValues.length}
                            </span>
                          )
                          : null
                      }
                    </div>
                    {
                      isExpanded
                        ? <ChevronUp className='h-4 w-4 text-muted-foreground' />
                        : <ChevronDown className='h-4 w-4 text-muted-foreground' />
                    }
                  </button>

                  {/* Filter content */}
                  {
                    isExpanded
                      ? (
                        <div className='border-t border-white/10 px-4 py-3'>
                          {/* Search input (if searchable) */}
                          {
                            filter.searchable
                              ? (
                                <div className='relative mb-3'>
                                  <Search className='absolute start-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />
                                  <input
                                    className='h-9 w-full rounded-lg border border-white/10 bg-white/5 pe-3 ps-8 text-sm text-white placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none'
                                    onChange={
                                      ( e ) => {
                                        updateSearchQuery( filter.id, e.target.value )
                                      }
                                    }
                                    placeholder={ t( 'searchFilters.searchPlaceholder' ) }
                                    type='text'
                                    value={ searchQuery }
                                  />
                                </div>
                              )
                              : null
                          }

                          {/* Clear button */}
                          {
                            0 < selectedValues.length
                              ? (
                                <button
                                  className='mb-2 text-xs font-medium text-[hsl(var(--gold))] hover:underline'
                                  onClick={
                                    () => {
                                      onClearFilter( filter.id )
                                    }
                                  }
                                  type='button'
                                >
                                  {t( 'searchFilters.clear' )}
                                </button>
                              )
                              : null
                          }

                          {/* Options list */}
                          <div className='max-h-48 space-y-1 overflow-y-auto'>
                            {
                              filteredOptions.map( ( option ) => {
                                const isSelected = selectedValues.includes( option.id )

                                return (
                                  <button
                                    className='flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-start transition-colors hover:bg-white/5'
                                    key={ option.id }
                                    onClick={
                                      () => {
                                        onToggleOption( filter.id, option.id )
                                      }
                                    }
                                    type='button'
                                  >
                                    <span
                                      className={
                                        cn(
                                          'text-sm',
                                          isSelected ? 'font-medium text-white' : 'text-muted-foreground',
                                        )
                                      }
                                    >
                                      {option.label}
                                    </span>
                                    <div className='flex items-center gap-2'>
                                      <span className='text-xs text-muted-foreground'>
                                        {option.count.toLocaleString()}
                                      </span>
                                      <div
                                        className={
                                          cn(
                                            'flex h-4 w-4 items-center justify-center rounded border transition-colors',
                                            isSelected
                                              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]'
                                              : 'border-white/20',
                                          )
                                        }
                                      >
                                        {isSelected ? <Check className='h-3 w-3 text-black' /> : null}
                                      </div>
                                    </div>
                                  </button>
                                )
                              } )
                            }
                          </div>
                        </div>
                      )
                      : null
                  }
                </div>
              )
            } )
          }
        </div>
      </div>
    </aside>
  )
}
