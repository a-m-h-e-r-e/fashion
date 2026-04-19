'use client'

import { useEffect, useState, type ReactNode } from 'react'

interface MSWProviderProps { children: ReactNode }

/**
 * MSW Provider component that initializes the mock service worker
 * in the browser during development.
 *
 * This component:
 * - Only activates in development mode
 * - Waits for the worker to start before rendering children
 * - Safely handles server-side rendering
 */
export const MSWProvider = ( { children }: MSWProviderProps ): ReactNode => {
  const [ isReady, setIsReady ] = useState( false )
  const shouldEnableMsw = 'true' === String( process.env.NEXT_PUBLIC_ENABLE_MSW ?? '' )
    .toLowerCase()

  useEffect( () => {
    const enableMocking = async () => {
      if ( !shouldEnableMsw ) {
        setIsReady( true )

        return
      }

      const { worker } = await import( '@/lib/api-mock/browser' )

      await worker.start( {
        onUnhandledRequest : 'bypass',
        serviceWorker      : { url: '/mockServiceWorker.js' },
      } )

      setIsReady( true )
    }

    enableMocking()
  }, [ shouldEnableMsw ] )

  // In development or test, wait for MSW to be ready
  // In production, render immediately
  if (
    !isReady
    && shouldEnableMsw
  ) {
    return null
  }

  return children
}
