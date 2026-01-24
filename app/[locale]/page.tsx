import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export default function Home( { params }: { params: { locale: string } } ) {
  setRequestLocale( params.locale )
  const t = useTranslations( 'home' )

  return (
    <main
      style={
        {
          display    : 'grid',
          minHeight  : '100vh',
          placeItems : 'center',
        }
      }
    >
      <h1
        style={
          {
            fontSize      : '3rem',
            fontWeight    : 300,
            letterSpacing : '-0.02em',
          }
        }
      >
        {t( 'title' )}
      </h1>
    </main>
  )
}
