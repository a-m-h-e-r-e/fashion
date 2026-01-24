import { setupWorker } from 'msw/browser'

import { handlers } from './handlers'

/**
 * Browser service worker for client-side mocking.
 * This intercepts requests made from the browser (client components).
 *
 * @see https://mswjs.io/docs/integrations/browser
 */
export const worker = setupWorker( ...handlers )
