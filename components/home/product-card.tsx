'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Heart, ShoppingBag } from 'lucide-react'
import type { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  product    : Product
  className? : string
}

export function ProductCard( { product, className }: ProductCardProps ) {
  const t = useTranslations( 'products' )

  // Calculate days since last update
  const daysSinceUpdate = () => {
    const updated = new Date( product.lastUpdated )
    const now = new Date()
    const diffTime = Math.abs( now.getTime() - updated.getTime() )
    const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) )

    return diffDays
  }

  const days = daysSinceUpdate()

  return (
    <a
      className={ cn( 'group flex flex-col', className ) }
      href={ `/product/${ product.id }` }
    >
      {/* Image container */}
      <div className='glass-card relative aspect-[3/4] w-full overflow-hidden'>
        <Image
          alt={ product.title }
          className='img-zoom object-cover'
          fill
          sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
          src={ product.imageUrl }
        />

        {/* Hover overlay with gradient */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100' />

        {/* Top badges */}
        <div className='absolute start-2 top-2 flex flex-col gap-1.5'>
          {/* Discount badge */}
          {
            null !== product.discount && 0 < product.discount
              ? (
                <div className='rounded-full bg-[hsl(var(--rose))] px-2.5 py-1 text-sm font-bold text-white shadow-lg'>
                  -{product.discount}%
                </div>
              )
              : null
          }
          {/* New badge */}
          {
            7 >= days
              ? (
                <div className='rounded-full bg-[hsl(var(--gold))] px-2.5 py-1 text-sm font-bold text-black shadow-lg'>
                  NEW
                </div>
              )
              : null
          }
        </div>

        {/* Favorite button */}
        <button
          className='absolute end-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 hover:bg-[hsl(var(--rose))] group-hover:opacity-100'
          onClick={
            ( event ) => {
              event.preventDefault()
            }
          }
          type='button'
        >
          <Heart className='h-4 w-4' />
        </button>

        {/* Quick add button - visible on hover */}
        <div className='absolute inset-x-3 bottom-3 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
          <button
            className='flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-base font-semibold text-black transition-colors hover:bg-[hsl(var(--gold))]'
            onClick={
              ( event ) => {
                event.preventDefault()
              }
            }
            type='button'
          >
            <ShoppingBag className='h-4 w-4' />
            {t( 'quickAdd' )}
          </button>
        </div>
      </div>

      {/* Product info */}
      <div className='mt-3 flex flex-col gap-1'>
        {/* Brand */}
        <span className='text-sm font-medium uppercase tracking-wider text-muted-foreground'>
          {product.brand}
        </span>

        {/* Title */}
        <h3 className='line-clamp-1 text-base font-medium text-foreground transition-colors group-hover:text-[hsl(var(--gold))]'>
          {product.title}
        </h3>

        {/* Size */}
        <span className='text-sm text-muted-foreground'>
          {t( 'sizeLabel', { size: product.size } )}
        </span>

        {/* Price row */}
        <div className='mt-1 flex items-baseline gap-2'>
          <span className='font-serif text-lg font-bold text-[hsl(var(--gold))]'>
            {t( 'currency' )}{product.price}
          </span>
          {
            null !== product.originalPrice && 0 < product.originalPrice
              ? (
                <span className='text-base text-muted-foreground line-through'>
                  {t( 'currency' )}{product.originalPrice}
                </span>
              )
              : null
          }
        </div>
      </div>
    </a>
  )
}
