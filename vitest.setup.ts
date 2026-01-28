import { beforeAll, afterEach, afterAll } from 'vitest'

import { server } from './lib/api-mock/server'

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
