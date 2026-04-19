import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

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

export default function RootLayout( { children }: { children: React.ReactNode } ) {
  return (
    <html suppressHydrationWarning>
      <body className={ `${ playfair.variable } ${ jakarta.variable } font-sans min-h-screen` }>
        {children}
      </body>
    </html>
  )
}
