'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import type { Category } from '@/lib/types'

interface SubcategoryScrollProps {
  subcategories  : Array<Category>
  activeSlug?    : string
  parentCategory : string
  className?     : string
}

export function SubcategoryScroll( {
  subcategories,
  activeSlug,
  parentCategory,
  className,
}: SubcategoryScrollProps ) {
  const t = useTranslations()

  if ( 0 === subcategories.length ) {
    return null
  }

  return (
    <div className={ cn( 'border-b border-white/10 bg-background/50', className ) }>
      <div className='scrollbar-hide mx-auto max-w-7xl overflow-x-auto px-4 py-3 lg:px-8'>
        <div className='flex gap-4'>
          {
            subcategories.map( ( subcat ) => {
              const isActive = subcat.slug === activeSlug
              const translationKey = subcat.name

              return (
                <Link
                  className={
                    cn(
                      'group flex shrink-0 flex-col items-center gap-2',
                      'transition-opacity',
                      isActive ? 'opacity-100' : 'opacity-70 hover:opacity-100',
                    )
                  }
                  href={ `/${ parentCategory }?subcategory=${ subcat.slug }` }
                  key={ subcat.id }
                >
                  {/* Image container */}
                  <div
                    className={
                      cn(
                        'relative h-16 w-16 overflow-hidden rounded-2xl border-2 transition-colors sm:h-20 sm:w-20',
                        isActive
                          ? 'border-[hsl(var(--gold))]'
                          : 'border-white/10 group-hover:border-white/20',
                      )
                    }
                  >
                    <Image
                      alt={ t( translationKey ) }
                      className='object-cover'
                      fill
                      sizes='80px'
                      src={ subcat.imageUrl }
                    />
                  </div>

                  {/* Label */}
                  <div className='text-center'>
                    <p
                      className={
                        cn(
                          'text-sm font-medium sm:text-base',
                          isActive ? 'text-white' : 'text-muted-foreground',
                        )
                      }
                    >
                      {t( translationKey )}
                    </p>
                    <p className='text-sm text-muted-foreground sm:text-base'>
                      {subcat.itemCount.toLocaleString()}
                    </p>
                  </div>
                </Link>
              )
            } )
          }
        </div>
      </div>
    </div>
  )
}
