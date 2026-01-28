'use client'

import { useTranslations } from 'next-intl'
import { ShoppingBag, Search, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'

interface SearchDesktopHeaderProps {
  categoryName : string
  className?   : string
}

export function SearchDesktopHeader( {
  categoryName,
  className,
}: SearchDesktopHeaderProps ) {
  const t = useTranslations( 'search' )

  return (
    <header
      className={
        cn(
          'fixed inset-x-0 top-0 z-50 hidden lg:block',
          className,
        )
      }
    >
      {/* Glass background */}
      <div className='absolute inset-0 border-b border-white/10 bg-background/80 backdrop-blur-xl' />

      <div className='relative mx-auto flex h-20 max-w-7xl items-center justify-between gap-8 px-8'>
        {/* Logo */}
        <Link className='group flex shrink-0 items-center gap-3' href='/'>
          <div className='flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))] shadow-lg transition-transform group-hover:scale-105'>
            <ShoppingBag className='h-5 w-5 text-black' />
          </div>
          <div className='flex flex-col'>
            <span className='font-serif text-xl font-bold tracking-wide text-white'>
              LUXE
            </span>
            <span className='text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground'>
              Fashion
            </span>
          </div>
        </Link>

        {/* Center Search Bar */}
        <div className='relative max-w-xl flex-1'>
          <Search className='absolute start-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <input
            className='h-12 w-full rounded-2xl border border-white/10 bg-white/5 pe-4 ps-12 text-sm text-white placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold)/0.5)]'
            placeholder={ `${ t( 'placeholder' ) } ${ categoryName }` }
            type='text'
          />
        </div>

        {/* Right actions */}
        <div className='flex shrink-0 items-center gap-1'>
          {/* Favorites */}
          <button
            className='flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-white'
            type='button'
          >
            <Heart className='h-5 w-5' />
          </button>

          {/* Cart */}
          <button
            className='relative flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-white'
            type='button'
          >
            <ShoppingBag className='h-5 w-5' />
            <span className='absolute -end-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-xs font-bold text-black'>
              2
            </span>
          </button>

          {/* Divider */}
          <div className='mx-2 h-6 w-px bg-white/10' />

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Profile avatar */}
          <button
            className='ms-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border-2 border-white/20 transition-colors hover:border-[hsl(var(--gold)/0.5)]'
            type='button'
          >
            <div className='h-full w-full bg-gradient-to-br from-[hsl(var(--gold)/0.3)] to-[hsl(var(--rose)/0.3)]' />
          </button>
        </div>
      </div>
    </header>
  )
}
