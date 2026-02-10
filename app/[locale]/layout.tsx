import type { Metadata } from 'next'
// eslint-disable-next-line camelcase
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { isRtlLocale, type Locale } from '@/i18n/config'
import { MSWProvider } from '@/components/providers/msw-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'
import { ThemeScript } from '@/components/providers/theme-script'
import '../globals.css'

/* eslint-disable new-cap */
const playfair = Playfair_Display( {
  subsets  : [ 'latin' ],
  variable : '--font-playfair',
  weight   : [ '400', '500', '600', '700' ],
} )

const jakarta = Plus_Jakarta_Sans( {
  subsets  : [ 'latin' ],
  variable : '--font-jakarta',
  weight   : [ '400', '500', '600', '700' ],
} )

export const generateStaticParams = () => routing.locales.map( ( locale ) => ( { locale } ) )
export const generateMetadata = async ( { params }: { params: Promise<{ locale: string }> } ): Promise<Metadata> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { locale } = await params
  const messages = await getMessages()
  const metadata = messages.metadata as {
    description : string
    title       : string
  }

  return {
    description : metadata.description,
    title       : metadata.title,
  }
}
export default async function LocaleLayout( {
  children,
  params,
}: {
  children : React.ReactNode
  params   : Promise<{ locale: string }>
} ) {
  const { locale } = await params

  if ( !routing.locales.includes( locale as typeof routing.locales[number] ) ) {
    notFound()
  }

  setRequestLocale( locale )

  const messages = await getMessages()
  const dir = isRtlLocale( locale as Locale ) ? 'rtl' : 'ltr'

  return (
    <html dir={ dir } lang={ locale } suppressHydrationWarning>
      <body className={ `${ playfair.variable } ${ jakarta.variable } font-sans min-h-screen` }>
        <ThemeScript />
        <ThemeProvider>
          <MSWProvider>
            <NextIntlClientProvider messages={ messages }>
              {children}
            </NextIntlClientProvider>
          </MSWProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
