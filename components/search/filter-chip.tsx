'use client'

import { useTranslations } from 'next-intl'
import { ChevronDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterConfig } from '@/lib/types'

interface FilterChipProps {
  filter         : FilterConfig
  selectedValues : Array<string>
  onClick        : () => void
  onClear?       : () => void
  className?     : string
}

export function FilterChip( {
  filter,
  selectedValues,
  onClick,
  onClear,
  className,
}: FilterChipProps ) {
  const t = useTranslations()
  const hasSelection = 0 < selectedValues.length

  // Get display label
  const getDisplayLabel = () => {
    if ( !hasSelection ) {
      return t( filter.name )
    }

    if ( 1 === selectedValues.length ) {
      const selected = filter.options.find( ( opt ) => opt.id === selectedValues[0] )

      return selected?.label ?? t( filter.name )
    }

    return `${ t( filter.name ) } (${ selectedValues.length })`
  }

  return (
    <div className={ cn( 'flex items-center', className ) }>
      <button
        className={
          cn(
            'flex h-9 items-center gap-1.5 rounded-full border px-4 text-base font-medium transition-colors',
            hasSelection
              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold)/0.1)] text-[hsl(var(--gold))]'
              : 'border-white/20 bg-white/5 text-white hover:border-white/30',
          )
        }
        onClick={ onClick }
        type='button'
      >
        <span>{getDisplayLabel()}</span>
        {
          hasSelection && onClear
            ? (
              <button
                className='ms-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--gold)/0.2)] transition-colors hover:bg-[hsl(var(--gold)/0.3)]'
                onClick={
                  ( e ) => {
                    e.stopPropagation()
                    onClear()
                  }
                }
                type='button'
              >
                <X className='h-3 w-3' />
              </button>
            )
            : <ChevronDown className='h-4 w-4' />
        }
      </button>
    </div>
  )
}

interface FilterBarProps {
  filters         : Array<FilterConfig>
  selectedFilters : Record<string, Array<string>>
  onFilterClick   : ( filterId: string ) => void
  onClearFilter   : ( filterId: string ) => void
  className?      : string
}

export function FilterBar( {
  filters,
  selectedFilters,
  onFilterClick,
  onClearFilter,
  className,
}: FilterBarProps ) {
  return (
    <div className={ cn( 'border-b border-white/10 bg-background/50', className ) }>
      <div className='scrollbar-hide mx-auto max-w-7xl overflow-x-auto px-4 py-3 lg:px-8'>
        <div className='flex gap-2'>
          {
            filters.map( ( filter ) => (
              <FilterChip
                filter={ filter }
                key={ filter.id }
                onClear={
                  () => {
                    onClearFilter( filter.id )
                  }
                }
                onClick={
                  () => {
                    onFilterClick( filter.id )
                  }
                }
                selectedValues={ selectedFilters[filter.id] ?? [] }
              />
            ) )
          }
        </div>
      </div>
    </div>
  )
}
