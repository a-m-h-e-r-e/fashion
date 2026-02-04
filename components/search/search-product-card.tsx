'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface SearchProductCardProps {
  product    : Product
  className? : string
}

export function SearchProductCard( { product, className }: SearchProductCardProps ) {
  return (
    <Link className={ cn( 'group relative', className ) } href={ `/product/${ product.id }` }>
      {/* Image container */}
      <div className='relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5'>
        <Image
          alt={ product.title }
          className='object-cover transition-transform duration-300 group-hover:scale-105'
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          src={ product.imageUrl }
        />

        {/* Favorite button */}
        <button
          className='absolute end-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60'
          onClick={
            ( e ) => {
              e.preventDefault()
            }
          }
          type='button'
        >
          <Heart className='h-5 w-5' />
        </button>

        {/* User avatar */}
        <div className='absolute bottom-2 start-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm'>
          <span className='text-sm font-medium text-white'>
            {product.brand.charAt( 0 )}
          </span>
        </div>
      </div>

      {/* Product info */}
      <div className='mt-3'>
        {/* Price */}
        <div className='flex items-baseline gap-2'>
          <span className='text-lg font-bold text-[hsl(var(--gold))]'>
            {product.price} zł
          </span>
          {
            product.originalPrice
              ? (
                <span className='text-base text-muted-foreground line-through'>
                  {product.originalPrice} zł
                </span>
              )
              : null
          }
        </div>

        {/* Condition */}
        <p className='mt-0.5 text-base text-muted-foreground'>
          {
            product.discount && 50 < product.discount
              ? 'Very good'
              : 'Good'
          }
        </p>

        {/* Title */}
        <p className='mt-1 line-clamp-2 text-base text-white'>
          {product.brand}, {product.title}, size {product.size}
        </p>
      </div>
    </Link>
  )
}
