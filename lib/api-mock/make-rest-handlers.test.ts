import { HttpResponse } from 'msw'
import { expect, test, describe, vi, beforeEach, afterEach } from 'vitest'
import makeRestHandlers, { type IRestHandlers } from './make-rest-handlers'

const originalEnv = process.env

beforeEach( () => {
  vi.stubEnv( 'NODE_ENV', originalEnv.NODE_ENV )
  vi.stubEnv( 'ENABLE_MSW', originalEnv.ENABLE_MSW )
} )

afterEach( () => {
  vi.unstubAllEnvs()
} )

const createHandlers = ( overrides?: Partial<IRestHandlers> ): Array<IRestHandlers> => [
  {
    endpoint     : 'https://api.example.com/hello',
    mockResponse : async () => HttpResponse.json( { body: 'ok' } ),
    ...overrides,
  },
]

describe( 'makeRestHandlers', () => {
  test( 'returns handlers when NODE_ENV is test', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'returns handlers when ENABLE_MSW is true', () => {
    vi.stubEnv( 'NODE_ENV', 'production' )
    vi.stubEnv( 'ENABLE_MSW', 'true' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'returns handlers when ENABLE_MSW is true (case insensitive)', () => {
    vi.stubEnv( 'NODE_ENV', 'production' )
    vi.stubEnv( 'ENABLE_MSW', 'TRUE' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'filters out handlers when NODE_ENV is development and activeInDevelopment is false', () => {
    vi.stubEnv( 'NODE_ENV', 'development' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = createHandlers( { activeInDevelopment: false } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 0 )
  } )

  test( 'includes handlers when NODE_ENV is development and activeInDevelopment is true', () => {
    vi.stubEnv( 'NODE_ENV', 'development' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = createHandlers( { activeInDevelopment: true } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'includes handlers when NODE_ENV is development and activeInDevelopment is unspecified', () => {
    vi.stubEnv( 'NODE_ENV', 'development' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'returns empty array when NODE_ENV is production and ENABLE_MSW is not set', () => {
    vi.stubEnv( 'NODE_ENV', 'production' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 0 )
  } )

  test( 'maps to http.get by default', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers()
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )

  test( 'uses specified method when provided', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers( { method: 'post' } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )

  test( 'returns empty array when handlers is empty', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const result = makeRestHandlers( [] )

    expect( result )
      .toHaveLength( 0 )
    expect( result )
      .toStrictEqual( [] )
  } )

  test( 'returns multiple handlers when NODE_ENV is test', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const [ secondHandler ] = createHandlers()
    const handlers = [
      ...createHandlers(),
      {
        ...secondHandler,
        endpoint : 'https://api.example.com/bye' as const,
      },
    ]
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 2 )
  } )

  test( 'filters mixed handlers in development by activeInDevelopment', () => {
    vi.stubEnv( 'NODE_ENV', 'development' )
    vi.stubEnv( 'ENABLE_MSW', '' )

    const handlers = [
      createHandlers( { activeInDevelopment: true } )[0],
      createHandlers( {
        activeInDevelopment : false,
        endpoint            : 'https://api.example.com/other' as const,
      } )[0],
    ]
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
  } )

  test( 'supports put method', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers( { method: 'put' } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )

  test( 'supports patch method', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers( { method: 'patch' } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )

  test( 'supports delete method', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers( { method: 'delete' } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )

  test( 'passes options to http handler', () => {
    vi.stubEnv( 'NODE_ENV', 'test' )

    const handlers = createHandlers( { options: { once: true } } )
    const result = makeRestHandlers( handlers )

    expect( result )
      .toHaveLength( 1 )
    expect( result[0] )
      .toBeDefined()
  } )
} )
