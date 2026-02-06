'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { cn } from '@/lib/utils'

interface FooterProps { className?: string }

const shopLinks = [
  { href: '/women', key: 'women' },
  { href: '/men', key: 'men' },
  { href: '/children', key: 'children' },
  { href: '/accessories', key: 'accessories' },
  { href: '/sports', key: 'sports' },
] as const

export function Footer( { className }: FooterProps ) {
  const t = useTranslations( 'footer' )
  const tCategories = useTranslations( 'categories' )

  return (
    <footer
      className={ cn(
        'border-t border-border bg-muted/50 dark:border-white/10 dark:bg-black/20',
        className,
      ) }
    >
      <div className='mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16'>
        <div className='grid gap-10 sm:grid-cols-2 lg:grid-cols-4'>
          {/* Shop */}
          <div>
            <h3 className='mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white'>
              {t( 'shop' )}
            </h3>
            <ul className='space-y-3'>
              {
                shopLinks.map( ( { href, key } ) => (
                  <li key={ key }>
                    <Link
                      className='text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/70 dark:hover:text-white'
                      href={ href }
                    >
                      {tCategories( key )}
                    </Link>
                  </li>
                ) )
              }
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className='mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white'>
              {t( 'help' )}
            </h3>
            <ul className='space-y-3'>
              <li>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/70 dark:hover:text-white'
                  href='/contact'
                >
                  {t( 'contact' )}
                </Link>
              </li>
              <li>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/70 dark:hover:text-white'
                  href='/faq'
                >
                  {t( 'faq' )}
                </Link>
              </li>
              <li>
                <Link
                  className='text-sm text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/70 dark:hover:text-white'
                  href='/shipping'
                >
                  {t( 'shipping' )}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className='mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white'>
              {t( 'contact' )}
            </h3>
            <p className='text-sm text-muted-foreground dark:text-white/70'>
              {t( 'phone' )}: +251 932 683 215
            </p>
            <p className='mt-1 text-sm text-muted-foreground dark:text-white/70'>
              {t( 'email' )}: hello@lightfashion.com
            </p>
          </div>

          {/* Brand */}
          <div>
            <h3 className='mb-4 font-serif text-sm font-semibold uppercase tracking-wider text-foreground dark:text-white'>
              Light Fashion
            </h3>
            <p className='max-w-xs text-sm text-muted-foreground dark:text-white/70'>
              {t( 'tagline' )}
            </p>
          </div>
        </div>

        <div className='mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 dark:border-white/10 sm:flex-row'>
          <p className='text-xs text-muted-foreground dark:text-white/60'>
            {t( 'copyright', { year: new Date().getFullYear() } )}
          </p>
          <div className='flex gap-6'>
            <Link
              className='text-xs text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/60 dark:hover:text-white'
              href='/privacy'
            >
              {t( 'privacy' )}
            </Link>
            <Link
              className='text-xs text-muted-foreground transition-colors hover:text-[hsl(var(--gold))] dark:text-white/60 dark:hover:text-white'
              href='/terms'
            >
              {t( 'terms' )}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
