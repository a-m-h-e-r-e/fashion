/* eslint-disable react/no-multi-comp */
'use client'

import Image from 'next/image'
import type { SizeOption } from '@/lib/types'
import { cn } from '@/lib/utils'
import { SectionHeader } from './section-header'

interface SizeFilterCardProps {
  index      : number
  size       : SizeOption
  className? : string
}

function SizeFilterCard( { size, index, className }: SizeFilterCardProps ) {
  // Staggered animation delay based on index
  const animationDelay = `${ index * 50 }ms`

  return (
    <a
      className={
        cn(
          'group relative flex aspect-[4/5] flex-col overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover:-translate-y-1 hover:border-[hsl(var(--gold)/0.3)]',
          className,
        )
      }
      href={ `/size/${ size.label.toLowerCase() }` }
      style={ { animationDelay } }
    >
      {/* Background image with overlay */}
      <div className='absolute inset-0'>
        <Image
          alt=''
          className='object-cover transition-transform duration-700 group-hover:scale-110'
          fill
          sizes='(max-width: 640px) 33vw, 16vw'
          src={ size.imageUrl }
        />
        {/* Gradient overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20' />
      </div>

      {/* Content */}
      <div className='relative z-10 flex flex-1 flex-col items-center justify-end p-3 pb-4'>
        {/* Size badge with glow */}
        <div className='mb-2 flex h-12 w-12 items-center justify-center rounded-full border-2 border-[hsl(var(--gold))] bg-black/50 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_hsl(var(--gold)/0.4)] sm:h-14 sm:w-14'>
          <span className='font-serif text-lg font-bold text-[hsl(var(--gold))] sm:text-xl'>
            {size.label}
          </span>
        </div>

        {/* Item count */}
        <span className='text-sm text-white/70'>
          {size.count}+ items
        </span>
      </div>

      {/* Hover shine effect */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full' />
    </a>
  )
}

interface SizeFilterGridProps {
  sizes      : Array<SizeOption>
  className? : string
}

export function SizeFilterGrid( { sizes, className }: SizeFilterGridProps ) {
  return (
    <section className={ cn( 'space-y-4', className ) }>
      <SectionHeader
        hasSeeAllLink={ false }
        titleKey='sizes.title'
      />
      <div className='grid grid-cols-3 gap-3 sm:grid-cols-6 lg:gap-4'>
        {
          sizes.map( ( size, index ) => (
            <SizeFilterCard index={ index } key={ size.id } size={ size } />
          ) )
        }
      </div>
    </section>
  )
}
