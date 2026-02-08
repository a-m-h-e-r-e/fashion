'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { ShoppingBag, Search, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Link } from '@/i18n/navigation'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface SearchDesktopHeaderProps {
  categoryName : string
  className?   : string
}

export function SearchDesktopHeader( {
  categoryName,
  className,
}: SearchDesktopHeaderProps ) {
  const t = useTranslations( 'search' )
  const [ isAtTop, setIsAtTop ] = useState( true )

  useEffect( () => {
    const handleScroll = () => {
      setIsAtTop( window.scrollY < 8 )
    }

    handleScroll()
    window.addEventListener( 'scroll', handleScroll, { passive: true } )

    return () => window.removeEventListener( 'scroll', handleScroll )
  }, [] )

  return (
    <header
      className={
        cn(
          'fixed inset-x-0 top-0 z-50 hidden lg:block',
          className,
        )
      }
    >
      {/* At top: blend with content. Scrolled: subtle bar with border */}
      <div
        className={
          cn(
            'absolute inset-0 border-b transition-all duration-300',
            isAtTop
              ? 'border-transparent bg-transparent backdrop-blur-none dark:bg-transparent'
              : 'border-border/80 bg-background/70 backdrop-blur-md dark:border-white/10 dark:bg-background/75',
          )
        }
      />

      <div className='relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-8'>
        {/* Logo - Light Fashion */}
        <Link className='group flex shrink-0 items-center gap-2.5' href='/'>
          <div className='relative h-9 w-9 shrink-0 overflow-hidden rounded-full border-2 border-border shadow-md transition-transform group-hover:scale-105 dark:border-white/20'>
            <Image
              alt='Light Fashion'
              className='object-contain p-0.5'
              fill
              sizes='36px'
              src='/images/light-fashion-logo.png'
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-sans text-xl font-bold tracking-wide text-foreground dark:text-white'>
              Light Fashion
            </span>
            <span className='text-sm font-semibold text-muted-foreground'>
              +251932683215
            </span>
          </div>
        </Link>

        {/* Center Search Bar */}
        <div className='relative max-w-xl flex-1'>
          <Search className='absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
          <input
            className={
              'h-10 w-full rounded-xl border pe-4 ps-10 text-sm placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none focus:ring-1 focus:ring-[hsl(var(--gold)/0.5)] '
              + 'border-border bg-muted/40 text-foreground dark:border-white/10 dark:bg-white/5 dark:text-white'
            }
            placeholder={ `${ t( 'placeholder' ) } ${ categoryName }` }
            type='text'
          />
        </div>

        {/* Right actions */}
        <div className='flex shrink-0 items-center gap-1'>
          {/* Favorites */}
          <button
            className='flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white'
            type='button'
          >
            <Heart className='h-5 w-5' />
          </button>

          {/* Cart */}
          <button
            className='relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground dark:hover:bg-white/10 dark:hover:text-white'
            type='button'
          >
            <ShoppingBag className='h-5 w-5' />
            <span className='absolute -end-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(var(--gold))] text-xs font-bold text-black'>
              2
            </span>
          </button>

          {/* Divider */}
          <div className='mx-1.5 h-5 w-px bg-border dark:bg-white/10' />

          {/* Theme toggle */}
          <ThemeToggle />

          {/* Language switcher */}
          <LanguageSwitcher />

          {/* Profile avatar */}
          <button
            className='ms-1.5 flex h-9 w-9 items-center justify-center overflow-hidden rounded-lg border-2 border-border transition-colors hover:border-[hsl(var(--gold)/0.5)] dark:border-white/20'
            type='button'
          >
            <div className='h-full w-full bg-gradient-to-br from-[hsl(var(--gold)/0.3)] to-[hsl(var(--rose)/0.3)]' />
          </button>
        </div>
      </div>
    </header>
  )
}
