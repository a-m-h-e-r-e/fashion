import { setupServer } from 'msw/node'

import { handlers } from './handlers'

/**
 * Node.js server for server-side mocking.
 * This intercepts requests made during:
 * - Server-side rendering (SSR)
 * - API routes
 * - Server components
 * - Unit/integration tests
 *
 * @see https://mswjs.io/docs/integrations/node
 */
export const server = setupServer( ...handlers )
