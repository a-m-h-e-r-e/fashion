import { expect, test, describe, vi, beforeEach } from 'vitest'
import queryFunction from './query-function'

const mockGet = vi.fn()
const mockPost = vi.fn()

vi.mock( './http-client', () => ( {
  default : {
    get  : ( url: string, config?: unknown ) => mockGet( url, config ),
    post : ( url: string, data?: unknown, config?: unknown ) => mockPost( url, data, config ),
  },
} ) )

beforeEach( () => {
  vi.clearAllMocks()
  mockGet.mockResolvedValue( { data: { items: [] } } )
  mockPost.mockResolvedValue( { data: { id: '1' } } )
} )

describe( 'queryFunction', () => {
  test( 'GET with endpoint only calls correct URL', async () => {
    const fn = queryFunction<{ items: Array<unknown> }>( {
      endpoint : '/api/products',
      method   : 'get',
    } )

    const result = await fn( {} )

    expect( mockGet )
      .toHaveBeenCalledTimes( 1 )
    expect( mockGet )
      .toHaveBeenCalledWith( '/api/products', undefined )
    expect( result )
      .toStrictEqual( { items: [] } )
  } )

  test( 'GET with id in params builds endpoint/id URL', async () => {
    const fn = queryFunction<{ id: string }>( {
      endpoint : '/api/products',
      method   : 'get',
      params   : { id: '123' },
    } )

    await fn( {} )

    expect( mockGet )
      .toHaveBeenCalledWith( '/api/products/123', undefined )
  } )

  test( 'GET with rest params appends query string', async () => {
    const fn = queryFunction<{ items: Array<unknown> }>( {
      endpoint : '/api/products',
      method   : 'get',
      params   : {
        category : 'shoes',
        limit    : '10',
      },
    } )

    await fn( {} )

    expect( mockGet )
      .toHaveBeenCalledTimes( 1 )
    const [ url ] = mockGet.mock.calls[0] as [ string ]

    expect( url )
      .toContain( '/api/products' )
    expect( url )
      .toContain( 'category=shoes' )
    expect( url )
      .toContain( 'limit=10' )
  } )

  test( 'GET with id and rest params builds URL with id and query', async () => {
    const fn = queryFunction<{ item: unknown }>( {
      endpoint : '/api/products',
      method   : 'get',
      params   : {
        expand : 'details',
        id     : '1',
      },
    } )

    await fn( {} )

    const [ url ] = mockGet.mock.calls[0] as [ string ]

    expect( url )
      .toContain( '/api/products/1' )
    expect( url )
      .toContain( 'expand=details' )
  } )

  test( 'returns response.data', async () => {
    mockGet.mockResolvedValue( { data: { name: 'Product' } } )

    const fn = queryFunction<{ name: string }>( {
      endpoint : '/api/product',
      method   : 'get',
    } )

    const result = await fn( {} )

    expect( result )
      .toStrictEqual( { name: 'Product' } )
  } )

  test( 'POST sends body and returns response.data', async () => {
    const fn = queryFunction<{ id: string }, { title: string }>( {
      endpoint : '/api/products',
      method   : 'post',
      params   : { queryKey: 'body' },
    } )

    const result = await fn( { title: 'New Product' } )

    expect( mockPost )
      .toHaveBeenCalledTimes( 1 )
    expect( mockPost )
      .toHaveBeenCalledWith(
        '/api/products',
        { title: 'New Product' },
        undefined,
      )
    expect( result )
      .toStrictEqual( { id: '1' } )
  } )

  test( 'POST without queryKey sends rest from params as body', async () => {
    const fn = queryFunction<{ id: string }>( {
      endpoint : '/api/products',
      method   : 'post',
      params   : {
        name  : 'Shirt',
        price : '20',
      },
    } )

    await fn( {} )

    expect( mockPost )
      .toHaveBeenCalledWith(
        '/api/products',
        {
          name  : 'Shirt',
          price : '20',
        },
        undefined,
      )
  } )

  test( 'passes httpClientConfiguration to GET', async () => {
    /* eslint-disable-next-line @typescript-eslint/naming-convention */
    const config = { headers: { 'X-Custom': 'value' } }

    const fn = queryFunction<unknown>( {
      endpoint                : '/api/products',
      httpClientConfiguration : config,
      method                  : 'get',
    } )

    await fn( {} )

    expect( mockGet )
      .toHaveBeenCalledWith( '/api/products', config )
  } )
} )
