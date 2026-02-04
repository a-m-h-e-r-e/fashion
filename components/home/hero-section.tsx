'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface HeroSectionProps { className?: string }

export function HeroSection( { className }: HeroSectionProps ) {
  const t = useTranslations( 'hero' )

  return (
    <section
      className={
        cn(
          'relative min-h-[85vh] overflow-hidden lg:min-h-[90vh]',
          className,
        )
      }
    >
      {/* Background gradient mesh */}
      <div className='absolute inset-0 bg-mesh' />

      {/* Decorative elements */}
      <div className='pointer-events-none absolute inset-0 overflow-hidden'>
        {/* Floating orb 1 */}
        <div className='absolute -start-32 top-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-[hsl(var(--gold)/0.2)] to-transparent blur-3xl animate-float' />
        {/* Floating orb 2 */}
        <div className='absolute -end-32 bottom-1/4 h-80 w-80 rounded-full bg-gradient-to-tl from-[hsl(var(--rose)/0.15)] to-transparent blur-3xl animate-float delay-300' />
        {/* Grid pattern */}
        <div
          className='absolute inset-0 opacity-[0.02]'
          style={
            {
              backgroundImage : 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize  : '60px 60px',
            }
          }
        />
      </div>

      {/* Content container */}
      <div className='relative mx-auto flex min-h-[85vh] max-w-7xl flex-col px-4 py-8 lg:min-h-[90vh] lg:flex-row lg:items-center lg:gap-12 lg:px-8 lg:py-16'>
        {/* Text content */}
        <div className='z-10 flex flex-1 flex-col justify-center pt-8 lg:pt-0'>
          {/* Badge */}
          <div className='mb-6 animate-fade-in-up'>
            <span className='inline-flex items-center gap-2 rounded-full border border-[hsl(var(--gold)/0.3)] bg-[hsl(var(--gold)/0.1)] px-4 py-1.5 text-base font-medium text-[hsl(var(--gold-dark))] dark:text-[hsl(var(--gold-light))]'>
              <Sparkles className='h-4 w-4' />
              {t( 'badge' )}
            </span>
          </div>

          {/* Main heading */}
          <h1 className='animate-fade-in-up font-serif text-4xl font-bold leading-[1.1] tracking-tight text-foreground delay-100 dark:text-white sm:text-5xl md:text-6xl lg:text-7xl'>
            {t( 'title.line1' )}
            <br />
            <span className='text-gradient-gold text-shadow-glow'>
              {t( 'title.line2' )}
            </span>
          </h1>

          {/* Subtitle */}
          <p className='mt-6 max-w-lg animate-fade-in-up text-base text-muted-foreground delay-200 sm:text-lg lg:text-xl'>
            {t( 'subtitle' )}
          </p>

          {/* CTA Buttons */}
          <div className='mt-8 flex animate-fade-in-up flex-wrap gap-4 delay-300'>
            <a className='btn-elegant flex items-center gap-2' href='/shop'>
              {t( 'cta.shop' )}
              <ArrowRight className='h-4 w-4' />
            </a>
            <a className='btn-outline' href='/collections'>
              {t( 'cta.explore' )}
            </a>
          </div>

          {/* Stats */}
          <div className='mt-12 flex animate-fade-in-up flex-wrap gap-8 delay-400 lg:gap-12'>
            <div>
              <div className='font-serif text-3xl font-bold text-foreground dark:text-white lg:text-4xl'>50K+</div>
              <div className='mt-1 text-base text-muted-foreground'>{t( 'stats.items' )}</div>
            </div>
            <div>
              <div className='font-serif text-3xl font-bold text-foreground dark:text-white lg:text-4xl'>100+</div>
              <div className='mt-1 text-base text-muted-foreground'>{t( 'stats.brands' )}</div>
            </div>
            <div>
              <div className='font-serif text-3xl font-bold text-[hsl(var(--gold))] lg:text-4xl'>70%</div>
              <div className='mt-1 text-base text-muted-foreground'>{t( 'stats.discount' )}</div>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className='relative mt-8 flex flex-1 items-center justify-center lg:mt-0'>
          {/* Main image container */}
          <div className='relative aspect-[3/4] w-full max-w-sm animate-scale-in lg:max-w-md xl:max-w-lg'>
            {/* Glow behind image */}
            <div className='absolute inset-4 rounded-3xl bg-gradient-to-b from-[hsl(var(--gold)/0.3)] to-[hsl(var(--rose)/0.2)] blur-3xl' />

            {/* Image frame */}
            <div className='glass-card relative h-full w-full overflow-hidden rounded-3xl'>
              <Image
                alt='Fashion model'
                className='object-cover object-top'
                fill
                priority
                sizes='(max-width: 768px) 100vw, 50vw'
                src='/images/hero-model.png'
              />
              {/* Overlay gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent' />
            </div>

            {/* Floating card - Featured item */}
            <div className='glass-card absolute -start-4 bottom-24 animate-float p-3 sm:-start-8 sm:p-4'>
              <div className='flex items-center gap-3'>
                <div className='relative h-12 w-12 overflow-hidden rounded-xl sm:h-14 sm:w-14'>
                  <Image
                    alt='Featured item'
                    className='object-cover'
                    fill
                    sizes='60px'
                    src='https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?w=120&q=80'
                  />
                </div>
                <div>
                  <p className='text-sm text-muted-foreground'>{t( 'featured.label' )}</p>
                  <p className='font-medium text-foreground dark:text-white'>{t( 'featured.item' )}</p>
                  <p className='text-base font-bold text-[hsl(var(--gold))]'>$89</p>
                </div>
              </div>
            </div>

            {/* Floating card - Trending */}
            <div className='glass-card absolute -end-4 top-24 animate-float delay-500 p-3 sm:-end-8 sm:p-4'>
              <div className='flex items-center gap-2'>
                <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(var(--gold)/0.2)]'>
                  <Sparkles className='h-5 w-5 text-[hsl(var(--gold))]' />
                </div>
                <div>
                  <p className='font-medium text-foreground dark:text-white'>{t( 'trending.label' )}</p>
                  <p className='text-sm text-muted-foreground'>{t( 'trending.count' )}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className='absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent' />
    </section>
  )
}
