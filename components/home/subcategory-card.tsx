'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import type { Category } from '@/lib/types'
import { cn } from '@/lib/utils'

interface SubcategoryCardProps {
  subcategory : Category
  className?  : string
}

export function SubcategoryCard( { subcategory, className }: SubcategoryCardProps ) {
  const t = useTranslations()

  return (
    <a
      className={
        cn(
          'group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--gold)/0.3)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.3)]',
          className,
        )
      }
      href={ `/${ subcategory.slug }` }
    >
      {/* Image container */}
      <div className='relative aspect-square w-full overflow-hidden'>
        <Image
          alt={ t( subcategory.name ) }
          className='object-cover transition-transform duration-700 group-hover:scale-110'
          fill
          sizes='(max-width: 640px) 33vw, 25vw'
          src={ subcategory.imageUrl }
        />

        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent' />

        {/* Arrow indicator */}
        <div className='absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:opacity-100'>
          <ArrowUpRight className='h-4 w-4' />
        </div>

        {/* Content */}
        <div className='absolute inset-x-0 bottom-0 p-3'>
          <h3 className='font-serif text-sm font-semibold text-white'>
            {t( subcategory.name )}
          </h3>
          <p className='mt-0.5 text-xs text-white/70'>
            {subcategory.itemCount}+ items
          </p>
        </div>
      </div>
    </a>
  )
}
