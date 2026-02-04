'use client'

import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Home, Heart, MessageCircle, User, ShoppingBag, Search } from 'lucide-react'
import type { NavItemId } from '@/lib/types'
import { cn } from '@/lib/utils'
import { LanguageSwitcher } from '@/components/ui/language-switcher'
import { ThemeToggle } from '@/components/ui/theme-toggle'

interface DesktopHeaderProps {
  activeItem? : NavItemId
  className?  : string
}

const navItems: Array<{
  href : string
  icon : React.ComponentType<{ className?: string }>
  id   : NavItemId
}> = [
  {
    href : '/',
    icon : Home,
    id   : 'home',
  },
  {
    href : '/favorites',
    icon : Heart,
    id   : 'favorites',
  },
  {
    href : '/chats',
    icon : MessageCircle,
    id   : 'chats',
  },
  {
    href : '/profile',
    icon : User,
    id   : 'profile',
  },
]

export function DesktopHeader( {
  activeItem = 'home',
  className,
}: DesktopHeaderProps ) {
  const t = useTranslations( 'nav' )

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

      <div className='relative mx-auto flex h-20 max-w-7xl items-center justify-between px-8'>
        {/* Logo - Light Fashion */}
        <a className='group flex items-center gap-3' href='/'>
          <div className='relative h-10 w-10 shrink-0 overflow-hidden rounded-full border-2 border-[hsl(var(--border))] shadow-lg transition-transform group-hover:scale-105'>
            <Image
              alt='Light Fashion'
              className='object-contain p-0.5'
              fill
              priority
              sizes='40px'
              src='/images/light-fashion-logo.png'
            />
          </div>
          <div className='flex flex-col'>
            <span className='font-sans text-xl font-bold tracking-wide text-white'>
              Light Fashion
            </span>
            <span className='text-[10px] font-medium text-muted-foreground'>
              +251932683215
            </span>
          </div>
        </a>

        {/* Center Navigation */}
        <nav className='absolute start-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-1'>
          {
            navItems.map( ( item ) => {
              const isActive = item.id === activeItem

              return (
                <a
                  className={
                    cn(
                      'relative px-5 py-2 text-sm font-medium tracking-wide transition-colors',
                      isActive
                        ? 'text-[hsl(var(--gold))]'
                        : 'text-muted-foreground hover:text-white',
                    )
                  }
                  href={ item.href }
                  key={ item.id }
                >
                  {t( item.id )}
                  {/* Active indicator */}
                  {
                    isActive
                      ? (
                        <span className='absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-[hsl(var(--gold-dark))] via-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]' />
                      )
                      : null
                  }
                </a>
              )
            } )
          }
        </nav>

        {/* Right actions */}
        <div className='flex items-center gap-1'>
          {/* Search button */}
          <button
            className='flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-white'
            type='button'
          >
            <Search className='h-5 w-5' />
          </button>

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

          {/* Theme toggle */}
          <ThemeToggle />

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
