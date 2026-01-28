'use client'

import { useTranslations } from 'next-intl'
import { ChevronRight } from 'lucide-react'
import type { Product } from '@/lib/types'
import { ProductCard } from './product-card'
import { cn } from '@/lib/utils'

interface ProductGridProps {
  products   : Array<Product>
  titleKey   : string
  className? : string
  href?      : string
}

export function ProductGrid( {
  products,
  titleKey,
  href = '#',
  className,
}: ProductGridProps ) {
  const t = useTranslations()

  if ( 0 === products.length ) {
    return null
  }

  return (
    <section className={ cn( 'space-y-4', className ) }>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <h2 className='text-lg font-semibold text-foreground'>
          {t( titleKey )}
        </h2>
        <a
          className='flex items-center gap-1 text-sm text-amber-500 transition-colors hover:text-amber-400'
          href={ href }
        >
          {t( 'common.more' )}
          <ChevronRight className='h-4 w-4 rtl:rotate-180' />
        </a>
      </div>

      {/* Horizontal scroll on mobile, grid on larger screens */}
      <div className='relative -mx-4 px-4 sm:mx-0 sm:px-0'>
        <div className='flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
          {
            products.map( ( product ) => (
              <ProductCard
                className='w-36 flex-shrink-0 sm:w-auto'
                key={ product.id }
                product={ product }
              />
            ) )
          }
        </div>
      </div>
    </section>
  )
}
