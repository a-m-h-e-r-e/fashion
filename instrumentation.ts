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
  // Allow enabling MSW explicitly via env var ENABLE_MSW=true, or via NODE_ENV
  const enableMswValue = process.env.ENABLE_MSW ?? ''
  const enableMswExplicit = 'true' === String( enableMswValue )
    .toLowerCase()
  const isDevOrTest = 'development' === process.env.NODE_ENV || 'test' === process.env.NODE_ENV

  if ( !enableMswExplicit && !isDevOrTest ) {
    // eslint-disable-next-line no-console
    console.info(
      '[instrumentation] register() skipping: NODE_ENV not development or test and ENABLE_MSW not set',
      {
        ENABLE_MSW : process.env.ENABLE_MSW,
        NODE_ENV   : process.env.NODE_ENV,
      },
    )

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
