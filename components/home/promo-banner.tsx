'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import type { Promo } from '@/lib/types'
import { cn } from '@/lib/utils'

interface PromoBannerProps {
  promo      : Promo
  className? : string
  variant?   : 'compact' | 'default'
}

export function PromoBanner( {
  promo,
  className,
  variant = 'default',
}: PromoBannerProps ) {
  const t = useTranslations()

  const isCompact = 'compact' === variant

  return (
    <a
      className={
        cn(
          'group relative flex overflow-hidden rounded-2xl border border-white/10 transition-all duration-500 hover-lift',
          isCompact ? 'h-32 sm:h-36 lg:h-40' : 'h-40 sm:h-48 lg:h-56',
          className,
        )
      }
      href={ promo.link }
    >
      {/* Background gradient */}
      <div
        className='absolute inset-0 transition-transform duration-700 group-hover:scale-105'
        style={ { background: promo.gradient } }
      />

      {/* Noise texture */}
      <div className='absolute inset-0 opacity-[0.03]' style={ { backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' } } />

      {/* Shine effect on hover */}
      <div className='absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full' />

      {/* Content */}
      <div
        className={
          cn(
            'relative z-10 flex flex-1 flex-col justify-center p-5 sm:p-6',
            null !== promo.imageUrl && '' !== promo.imageUrl
              ? 'max-w-[60%]'
              : 'max-w-full',
          )
        }
      >
        <h3
          className={
            cn(
              'font-serif font-bold text-white',
              isCompact ? 'text-lg sm:text-xl lg:text-2xl' : 'text-xl sm:text-2xl lg:text-3xl',
            )
          }
        >
          {t( promo.titleKey )}
        </h3>
        <p
          className={
            cn(
              'mt-1 text-white/80',
              isCompact ? 'text-xs sm:text-sm' : 'text-sm sm:text-base',
            )
          }
        >
          {t( promo.subtitleKey )}
        </p>
        {
          null !== promo.ctaKey && '' !== promo.ctaKey
            ? (
              <span className='mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-all group-hover:bg-[hsl(var(--gold))] group-hover:gap-3'>
                {t( promo.ctaKey )}
                <ArrowRight className='h-4 w-4' />
              </span>
            )
            : null
        }
      </div>

      {/* Image */}
      {
        null !== promo.imageUrl && '' !== promo.imageUrl
          ? (
            <div className='absolute bottom-0 end-0 top-0 w-[45%] sm:w-[40%]'>
              <Image
                alt=''
                className='object-cover object-center transition-transform duration-700 group-hover:scale-110'
                fill
                sizes='(max-width: 640px) 45vw, 30vw'
                src={ promo.imageUrl }
              />
              {/* Gradient overlay for better text readability */}
              <div className='absolute inset-0 bg-gradient-to-e from-black/40 to-transparent' />
            </div>
          )
          : null
      }
    </a>
  )
}
