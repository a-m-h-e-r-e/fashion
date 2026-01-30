'use client'

import { useTranslations } from 'next-intl'
import { Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SearchBarProps { className?: string }

export function SearchBar( { className }: SearchBarProps ) {
  const t = useTranslations( 'search' )

  return (
    <div className={ cn( 'flex items-center gap-3', className ) }>
      <div className='glass-card relative flex-1'>
        <Search className='absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
        <input
          className='h-12 w-full rounded-xl border-0 bg-transparent ps-12 pe-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[hsl(var(--gold)/0.3)] lg:h-14 lg:text-base'
          placeholder={ t( 'placeholder' ) }
          type='search'
        />
      </div>
      <button
        className='glass-card flex h-12 items-center gap-2 rounded-xl px-4 text-sm font-medium text-[hsl(var(--gold))] transition-all hover:bg-[hsl(var(--gold)/0.1)] lg:h-14'
        type='button'
      >
        <SlidersHorizontal className='h-5 w-5' />
        <span className='hidden sm:inline'>{t( 'filters' )}</span>
      </button>
    </div>
  )
}
