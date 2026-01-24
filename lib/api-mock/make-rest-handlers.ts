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

const makeRestHandlers = ( handlers: Array<IRestHandlers> ) => handlers
  .filter( ( { activeInDevelopment } ) => 'test' === process.env.NODE_ENV
    || ( 'development' === process.env.NODE_ENV && ( activeInDevelopment ?? true ) ) )
  .map( ( { endpoint, method, mockResponse, options } ) => http[method ?? 'get']( endpoint, mockResponse, options ) )

export type { IRestHandlers }
export default makeRestHandlers
