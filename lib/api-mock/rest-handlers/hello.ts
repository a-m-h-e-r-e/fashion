import { HttpResponse, delay } from 'msw'
import { type IRestHandlers } from '../make-rest-handlers'

/**
 * Define your mock API handlers here.
 * These handlers intercept network requests and return mock responses.
 *
 * @see https://mswjs.io/docs/basics/intercepting-requests
 */
const helloRestHandlers: Array<IRestHandlers> = [
  {
    endpoint     : 'hello',
    mockResponse : async () => {
      await delay( 100 )

      return HttpResponse.json( { data: 'Hello, world!' } )
    },
  },
]

export default helloRestHandlers
