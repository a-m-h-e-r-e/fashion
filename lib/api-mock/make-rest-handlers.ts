import {
  http,
  type AsyncResponseResolverReturnType,
  type Path,
  type RequestHandlerOptions,
} from 'msw'

type IMockResponse = ( info: {
  cookies : Record<string, Array<string> | string>
  params  : Record<string, Array<string> | string>
  request : Request
} ) => AsyncResponseResolverReturnType<undefined>

type IRestHandlers = {
  endpoint             : Path
  mockResponse         : IMockResponse
  activeInDevelopment? : boolean
  method?              : keyof typeof http
  options?             : RequestHandlerOptions
}

/**
 * Build REST handlers.
 *
 * Handlers are enabled when:
 * - ENABLE_MSW=true is set explicitly, OR
 * - NODE_ENV === 'test', OR
 * - NODE_ENV === 'development' and the handler's `activeInDevelopment` flag is true (or unspecified).
 */
const makeRestHandlers = ( handlers: Array<IRestHandlers> ) => {
  const enableMswValue = process.env.ENABLE_MSW ?? ''
  const enableMswExplicit = 'true' === String( enableMswValue )
    .toLowerCase()
  const isTest = 'test' === process.env.NODE_ENV
  const isDev = 'development' === process.env.NODE_ENV

  return handlers
    .filter(
      ( { activeInDevelopment } ) => enableMswExplicit || isTest || ( isDev && ( activeInDevelopment ?? true ) ),
    )
    .map( ( { endpoint, method, mockResponse, options } ) => http[method ?? 'get']( endpoint, mockResponse, options ) )
}

export type { IRestHandlers }
export default makeRestHandlers
