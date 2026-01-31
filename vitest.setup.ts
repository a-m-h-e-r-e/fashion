import React from 'react'
import { beforeAll, afterEach, afterAll, vi } from 'vitest'

import { server } from './lib/api-mock/server'

vi.mock( 'next/image', () => ( {
  default : ( { alt, src }: { alt: string; src: string } ) =>
    // eslint-disable-next-line @next/next/no-img-element -- test mock
    React.createElement( 'img', { alt, src } ),
} ) )

/**
 * Global MSW setup for all tests.
 *
 * This ensures API mocking is available in every test file automatically.
 * Individual tests can override handlers using server.use().
 */
beforeAll( () => {
  server.listen( { onUnhandledRequest: 'bypass' } )
} )

afterEach( () => {
  server.resetHandlers()
} )

afterAll( () => {
  server.close()
} )
