import makeRestHandlers from './make-rest-handlers'
import resetHandlers from './rest-handlers'

/**
 * Define your mock API handlers here.
 * These handlers intercept network requests and return mock responses.
 *
 * @see https://mswjs.io/docs/basics/intercepting-requests
 */
export const handlers = makeRestHandlers( resetHandlers )
