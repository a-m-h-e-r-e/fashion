'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { locales, localeNames, type Locale } from '@/i18n/config'
import { Languages, ChevronDown, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'

export function LanguageSwitcher() {
  const t = useTranslations( 'settings' )
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [ isOpen, setIsOpen ] = useState( false )
  const dropdownRef = useRef<HTMLDivElement>( null )

  // Close dropdown when clicking outside
  useEffect( () => {
    const handleClickOutside = ( event: MouseEvent ) => {
      if ( dropdownRef.current && !dropdownRef.current.contains( event.target as Node ) ) {
        setIsOpen( false )
      }
    }

    document.addEventListener( 'mousedown', handleClickOutside )

    return () => {
      document.removeEventListener( 'mousedown', handleClickOutside )
    }
  }, [] )

  const handleLocaleChange = ( newLocale: Locale ) => {
    router.replace( pathname, { locale: newLocale } )
    setIsOpen( false )
  }

  return (
    <div className='relative' ref={ dropdownRef }>
      <button
        aria-expanded={ isOpen }
        aria-haspopup='listbox'
        aria-label={ t( 'language' ) }
        className='flex h-10 items-center gap-2 rounded-xl px-3 text-muted-foreground transition-colors hover:bg-white/5 hover:text-white'
        onClick={
          () => {
            setIsOpen( !isOpen )
          }
        }
        type='button'
      >
        <Languages className='h-5 w-5' />
        <span className='text-base font-medium'>{localeNames[locale]}</span>
        <ChevronDown
          className={
            cn(
              'h-4 w-4 transition-transform',
              isOpen && 'rotate-180',
            )
          }
        />
      </button>

      {/* Dropdown */}
      {
        isOpen
          ? (
            <div className='absolute end-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-white/10 bg-background/95 p-1 shadow-xl backdrop-blur-xl'>
              {
                locales.map( ( loc ) => (
                  <button
                    className={
                      cn(
                        'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-start text-base transition-colors',
                        loc === locale
                          ? 'bg-[hsl(var(--gold)/0.1)] text-[hsl(var(--gold))]'
                          : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                      )
                    }
                    key={ loc }
                    onClick={
                      () => {
                        handleLocaleChange( loc )
                      }
                    }
                    type='button'
                  >
                    <span>{localeNames[loc]}</span>
                    {
                      loc === locale
                        ? <Check className='h-4 w-4' />
                        : null
                    }
                  </button>
                ) )
              }
            </div>
          )
          : null
      }
    </div>
  )
}
