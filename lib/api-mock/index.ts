/**
 * MSW Mock Service
 *
 * This module provides API mocking for both client and server environments.
 *
 * Usage:
 * - Browser: Automatically started via MSWProvider in development
 * - Server/Tests: Import and start the server manually
 *
 * @example
 * // In tests
 * import { server } from '@/mocks/server'
 * beforeAll(() => server.listen())
 * afterEach(() => server.resetHandlers())
 * afterAll(() => server.close())
 */
export { handlers } from './handlers'
