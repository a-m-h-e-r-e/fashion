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

  useEffect( () => {
    const enableMocking = async () => {
      // Enable MSW in both development and test environments.
      // In other environments (production), skip initializing the worker.
      if (
        'development' !== process.env.NODE_ENV
        && 'test' !== process.env.NODE_ENV
      ) {
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
  }, [] )

  // In development or test, wait for MSW to be ready
  // In production, render immediately
  if (
    !isReady
    && ( 'development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV )
  ) {
    return null
  }

  return children
}
