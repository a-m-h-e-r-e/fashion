import { afterAll, afterEach, beforeAll } from 'vitest'
import { server } from './server'

/**
 * Test utilities for MSW integration with Vitest.
 *
 * @example
 * // In your test file:
 * import { setupMockServer } from '@/mocks/test-utils'
 *
 * setupMockServer()
 *
 * describe('MyComponent', () => {
 *   it('fetches data', async () => {
 *     // Your test that makes API calls
 *   })
 * })
 */
export const setupMockServer = (): void => {
  beforeAll( () => {
    server.listen( { onUnhandledRequest: 'error' } )
  } )

  afterEach( () => {
    server.resetHandlers()
  } )

  afterAll( () => {
    server.close()
  } )
}
/**
 * Re-export server for custom handler overrides in tests.
 *
 * @example
 * import { server } from '@/mocks/test-utils'
 * import { http, HttpResponse } from 'msw'
 *
 * it('handles error state', async () => {
 *   server.use(
 *     http.get('/api/products', () => {
 *       return HttpResponse.json({ error: 'Failed' }, { status: 500 })
 *     })
 *   )
 *   // Test error handling
 * })
 */
export { server }
