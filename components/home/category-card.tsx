'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface CategoryCardProps {
  category   : Category
  className? : string
}

export function CategoryCard( { category, className }: CategoryCardProps ) {
  const t = useTranslations()

  // Format large numbers as "167k+"
  const displayCount = ( count: number ) => {
    if ( 1000 <= count ) {
      return `${ Math.round( count / 1000 ) }k+`
    }

    return count.toString()
  }

  return (
    <Link
      className={
        cn(
          'group relative flex flex-col overflow-hidden rounded-2xl border-gradient hover-lift',
          className,
        )
      }
      href={ `/${ category.slug }` }
    >
      {/* Image container */}
      <div className='relative aspect-square w-full overflow-hidden bg-secondary'>
        <Image
          alt={ t( category.name ) }
          className='img-zoom object-cover'
          fill
          sizes='(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw'
          src={ category.imageUrl }
        />

        {/* Overlay gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-[hsl(var(--gold)/0.1)] opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Content overlay */}
        <div className='absolute inset-x-0 bottom-0 p-3'>
          {/* Category name */}
          <h3 className='font-serif text-sm font-semibold text-white sm:text-base'>
            {t( category.name )}
          </h3>

          {/* Item count */}
          <p className='mt-0.5 text-xs text-white/70'>
            {displayCount( category.itemCount )} items
          </p>
        </div>

        {/* Arrow indicator */}
        <div className='absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100 sm:h-8 sm:w-8'>
          <ArrowUpRight className='h-3.5 w-3.5 sm:h-4 sm:w-4' />
        </div>
      </div>
    </Link>
  )
}
