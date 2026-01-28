'use client'

import { useTranslations } from 'next-intl'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  titleKey       : string
  className?     : string
  hasSeeAllLink? : boolean
  href?          : string
}

export function SectionHeader( {
  titleKey,
  href = '#',
  hasSeeAllLink = true,
  className,
}: SectionHeaderProps ) {
  const t = useTranslations()

  return (
    <div className={ cn( 'flex items-end justify-between', className ) }>
      <div>
        <h2 className='font-serif text-xl font-bold text-white sm:text-2xl lg:text-3xl'>
          {t( titleKey )}
        </h2>
        <div className='mt-1 h-0.5 w-12 rounded-full bg-gradient-to-r from-[hsl(var(--gold))] to-transparent' />
      </div>
      {
        hasSeeAllLink
          ? (
            <a
              className='group flex items-center gap-1 text-sm font-medium text-[hsl(var(--gold))] transition-colors hover:text-[hsl(var(--gold-light))]'
              href={ href }
            >
              {t( 'common.seeAll' )}
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1' />
            </a>
          )
          : null
      }
    </div>
  )
}
