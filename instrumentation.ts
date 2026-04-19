/* eslint-disable @typescript-eslint/naming-convention */
/**
 * Next.js Instrumentation
 *
 * This file is automatically loaded by Next.js and runs once when the server starts.
 * Used to initialize MSW for server-side request mocking in development and test.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  // Only enable MSW when explicitly requested.
  const enableMswValue = process.env.ENABLE_MSW ?? ''
  const enableMswExplicit = 'true' === String( enableMswValue )
    .toLowerCase()

  if ( !enableMswExplicit ) {
    // Keep runtime on real backend by default.

    return
  }

  // Server-side mocking (Node.js environment)
  if ( 'nodejs' === process.env.NEXT_RUNTIME ) {
    const { server } = await import( './lib/api-mock/server' )

    server.listen( { onUnhandledRequest: 'bypass' } )

    // eslint-disable-next-line no-console
    console.info( '[MSW] Server-side mocking enabled' )
  } else {
    // eslint-disable-next-line no-console
    console.info(
      '[instrumentation] register() skipping: NEXT_RUNTIME !== nodejs',
      { NEXT_RUNTIME: process.env.NEXT_RUNTIME },
    )
  }
}
