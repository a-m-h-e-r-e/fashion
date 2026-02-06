'use client'

import { useTranslations } from 'next-intl'
import { Home, Heart, MessageCircle, User } from 'lucide-react'
import type { NavItemId } from '@/lib/types'
import { cn } from '@/lib/utils'

interface BottomNavigationProps {
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

export function BottomNavigation( {
  activeItem = 'home',
  className,
}: BottomNavigationProps ) {
  const t = useTranslations( 'nav' )

  return (
    <nav
      className={
        cn(
          'fixed inset-x-0 bottom-0 z-50 lg:hidden',
          className,
        )
      }
    >
      {/* Glass background */}
      <div className='absolute inset-0 border-t border-white/10 bg-background/90 backdrop-blur-xl' />

      <div className='relative mx-auto flex h-16 max-w-lg items-center justify-around px-2'>
        {
          navItems.map( ( item ) => {
            const isActive = item.id === activeItem
            const Icon = item.icon

            return (
              <a
                className={
                  cn(
                    'relative flex flex-col items-center gap-1 px-4 py-2 transition-all',
                    isActive
                      ? 'text-[hsl(var(--gold))]'
                      : 'text-muted-foreground',
                  )
                }
                href={ item.href }
                key={ item.id }
              >
                {/* Active glow */}
                {
                  isActive
                    ? (
                      <span className='absolute -top-1 h-8 w-8 rounded-full bg-[hsl(var(--gold)/0.15)] blur-xl' />
                    )
                    : null
                }
                <Icon
                  className={
                    cn(
                      'relative h-5 w-5 transition-transform',
                      isActive ? 'scale-110' : '',
                    )
                  }
                />
                <span
                  className={
                    cn(
                      'relative text-sm font-medium',
                      isActive ? 'text-[hsl(var(--gold))]' : '',
                    )
                  }
                >
                  {t( item.id )}
                </span>
                {/* Active dot */}
                {
                  isActive
                    ? (
                      <span className='absolute -bottom-1 h-1 w-1 rounded-full bg-[hsl(var(--gold))]' />
                    )
                    : null
                }
              </a>
            )
          } )
        }
      </div>
      {/* Safe area padding for mobile devices */}
      <div className='relative h-safe-area-inset-bottom bg-background/90' />
    </nav>
  )
}
