'use client'

import { useTranslations } from 'next-intl'
import { ArrowLeft, Search, SlidersHorizontal } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'

interface SearchHeaderProps {
  categoryName  : string
  onFilterClick : () => void
  hasFilters?   : boolean
  className?    : string
}

export function SearchHeader( {
  categoryName,
  onFilterClick,
  hasFilters = false,
  className,
}: SearchHeaderProps ) {
  const t = useTranslations( 'search' )

  return (
    <header
      className={
        cn(
          'sticky top-0 z-40 border-b border-white/10 bg-background/95 backdrop-blur-xl',
          className,
        )
      }
    >
      <div className='mx-auto flex h-14 max-w-7xl items-center gap-3 px-4 lg:h-16 lg:px-8'>
        {/* Back button */}
        <Link
          className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-white'
          href='/'
        >
          <ArrowLeft className='h-5 w-5' />
        </Link>

        {/* Search input */}
        <div className='relative flex-1'>
          <Search className='absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <input
            className='h-10 w-full rounded-xl border border-white/10 bg-white/5 pe-4 ps-10 text-base text-white placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold)/0.5)]'
            placeholder={ `${ t( 'placeholder' ) } ${ categoryName }` }
            type='text'
          />
        </div>

        {/* Filter button */}
        <button
          className={
            cn(
              'relative flex h-10 shrink-0 items-center gap-2 rounded-xl px-4 text-base font-medium transition-colors',
              hasFilters
                ? 'bg-[hsl(var(--gold))] text-black'
                : 'text-[hsl(var(--gold))] hover:bg-white/5',
            )
          }
          onClick={ onFilterClick }
          type='button'
        >
          <SlidersHorizontal className='h-4 w-4' />
          <span className='hidden sm:inline'>{t( 'filters' )}</span>
          {/* Active filter indicator */}
          {
            hasFilters
              ? null
              : (
                <span className='absolute -end-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-[hsl(var(--rose))]' />
              )
          }
        </button>
      </div>
    </header>
  )
}
