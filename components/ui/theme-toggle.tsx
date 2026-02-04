'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/components/providers/theme-provider'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
  'aria-label'?: string
}

export function ThemeToggle( { className, 'aria-label': ariaLabel }: ThemeToggleProps ) {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      aria-label={ ariaLabel ?? ( theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode' ) }
      className={
        cn(
          'flex h-10 w-10 items-center justify-center rounded-xl text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground dark:hover:text-white',
          className,
        )
      }
      onClick={ toggleTheme }
      type='button'
    >
      {
        theme === 'dark'
          ? <Sun className='h-5 w-5' />
          : <Moon className='h-5 w-5' />
      }
    </button>
  )
}
