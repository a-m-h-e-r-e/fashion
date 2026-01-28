'use client'

import { cn } from '@/lib/utils'

interface BrandsMarqueeProps { className?: string }

const brands = [
  'GUCCI',
  'PRADA',
  'VERSACE',
  'DIOR',
  'CHANEL',
  'BALENCIAGA',
  'LOUIS VUITTON',
  'BURBERRY',
  'GIVENCHY',
  'FENDI',
  'YSL',
  'VALENTINO',
]

export function BrandsMarquee( { className }: BrandsMarqueeProps ) {
  return (
    <div className={ cn( 'relative overflow-hidden border-y border-white/10 bg-black/30 py-4', className ) }>
      {/* Fade edges */}
      <div className='pointer-events-none absolute inset-y-0 start-0 z-10 w-32 bg-gradient-to-r from-background to-transparent' />
      <div className='pointer-events-none absolute inset-y-0 end-0 z-10 w-32 bg-gradient-to-l from-background to-transparent' />

      {/* Marquee track */}
      <div className='flex animate-marquee'>
        {/* First set */}
        <div className='flex shrink-0'>
          {
            brands.map( ( brand, index ) => (
              <div
                className='flex items-center px-8 lg:px-12'
                key={ `first-${ index }` }
              >
                <span className='whitespace-nowrap font-serif text-lg font-medium tracking-widest text-white/60 transition-colors hover:text-[hsl(var(--gold))] lg:text-xl'>
                  {brand}
                </span>
                <span className='mx-8 text-[hsl(var(--gold)/0.4)] lg:mx-12'>✦</span>
              </div>
            ) )
          }
        </div>
        {/* Duplicate for seamless loop */}
        <div className='flex shrink-0'>
          {
            brands.map( ( brand, index ) => (
              <div
                className='flex items-center px-8 lg:px-12'
                key={ `second-${ index }` }
              >
                <span className='whitespace-nowrap font-serif text-lg font-medium tracking-widest text-white/60 transition-colors hover:text-[hsl(var(--gold))] lg:text-xl'>
                  {brand}
                </span>
                <span className='mx-8 text-[hsl(var(--gold)/0.4)] lg:mx-12'>✦</span>
              </div>
            ) )
          }
        </div>
      </div>
    </div>
  )
}
