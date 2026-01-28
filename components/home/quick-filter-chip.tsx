/* eslint-disable react/no-multi-comp */
'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Sparkles, Tag, CheckCircle } from 'lucide-react'
import type { QuickFilter } from '@/lib/types'
import { cn } from '@/lib/utils'

interface QuickFilterChipProps {
  filter     : QuickFilter
  className? : string
}

const filterIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  budget    : Tag,
  condition : CheckCircle,
  sale      : Sparkles,
}

export function QuickFilterChip( { filter, className }: QuickFilterChipProps ) {
  const t = useTranslations()
  const Icon = filterIcons[filter.type] ?? Sparkles

  return (
    <a
      className={
        cn(
          'group relative flex flex-col items-center gap-3',
          className,
        )
      }
      href={ `/filter/${ filter.type }` }
    >
      {/* Card with glass effect */}
      <div className='relative aspect-square w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--gold)/0.3)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]'>
        <Image
          alt={ t( filter.labelKey ) }
          className='object-cover transition-transform duration-700 group-hover:scale-110'
          fill
          sizes='(max-width: 640px) 33vw, 25vw'
          src={ filter.imageUrl }
        />

        {/* Overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

        {/* Badge */}
        {
          null !== filter.badge && '' !== filter.badge
            ? (
              <div
                className={
                  cn(
                    'absolute start-2 top-2 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold text-white shadow-lg',
                    'sale' === filter.type
                      ? 'bg-gradient-to-r from-[hsl(var(--rose))] to-[hsl(350,80%,55%)]'
                      : 'bg-gradient-to-r from-emerald-500 to-emerald-600',
                  )
                }
              >
                <Icon className='h-3 w-3' />
                {filter.badge}
              </div>
            )
            : null
        }

        {/* Bottom label inside card */}
        <div className='absolute inset-x-0 bottom-0 p-3'>
          <span className='font-medium text-white'>
            {t( filter.labelKey )}
          </span>
        </div>
      </div>
    </a>
  )
}

interface QuickFiltersRowProps {
  filters    : Array<QuickFilter>
  className? : string
}

export function QuickFiltersRow( { filters, className }: QuickFiltersRowProps ) {
  return (
    <div className={ cn( 'grid grid-cols-3 gap-3 lg:gap-4', className ) }>
      {
        filters.map( ( filter ) => (
          <QuickFilterChip filter={ filter } key={ filter.id } />
        ) )
      }
    </div>
  )
}
