/**
 * Next.js Instrumentation
 *
 * This file is automatically loaded by Next.js and runs once when the server starts.
 * Used to initialize MSW for server-side request mocking in development.
 *
 * @see https://nextjs.org/docs/app/building-your-application/optimizing/instrumentation
 */
export async function register() {
  if ( 'development' !== process.env.NODE_ENV ) {
    return
  }

  // Server-side mocking (Node.js environment)
  if ( 'nodejs' === process.env.NEXT_RUNTIME ) {
    const { server } = await import( './lib/api-mock/server' )

    server.listen( { onUnhandledRequest: 'bypass' } )

    // eslint-disable-next-line no-console
    console.info( '[MSW] Server-side mocking enabled' )
  }
}
