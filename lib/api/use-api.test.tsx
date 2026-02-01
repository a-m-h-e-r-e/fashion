import { expect, test, describe, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import { useApiQuery, usePaginatedApiQuery } from './use-api'

const mockQueryFn = vi.fn()

vi.mock( './query-function', () => ( {
  default : () => mockQueryFn,
} ) )

beforeEach( () => {
  vi.clearAllMocks()
  mockQueryFn.mockResolvedValue( { items: [ { id: '1', name: 'Product' } ] } )
} )

const createWrapper = ( client: QueryClient ) => {
  const Wrapper = ( { children }: { children: React.ReactNode } ) => (
    <QueryClientProvider client={ client }>
      {children}
    </QueryClientProvider>
  )

  return Wrapper
}

describe( 'useApiQuery', () => {
  test( 'calls queryFunction with endpoint and get method', async () => {
    const client = new QueryClient( { defaultOptions: { queries: { retry: false } } } )

    renderHook(
      () => useApiQuery<{ items: Array<{ id: string; name: string }> }>( {
        endpoint : '/api/products',
        params   : {},
      } ),
      { wrapper: createWrapper( client ) },
    )

    await waitFor( () => {
      expect( mockQueryFn ).toHaveBeenCalled()
    } )
  } )

  test( 'returns data after query resolves', async () => {
    const client = new QueryClient( { defaultOptions: { queries: { retry: false } } } )

    const { result } = renderHook(
      () => useApiQuery<{ items: Array<{ id: string; name: string }> }>( {
        endpoint : '/api/products',
        params   : {},
      } ),
      { wrapper: createWrapper( client ) },
    )

    await waitFor( () => {
      expect( result.current.isSuccess ).toBe( true )
    } )

    expect( result.current.data ).toStrictEqual( {
      items: [ { id: '1', name: 'Product' } ],
    } )
  } )

  test( 'queryKey includes endpoint and params', async () => {
    const client = new QueryClient( { defaultOptions: { queries: { retry: false } } } )

    renderHook(
      () => useApiQuery<unknown>( {
        endpoint : '/api/categories',
        params   : { slug: 'women' },
      } ),
      { wrapper: createWrapper( client ) },
    )

    await waitFor( () => {
      expect( mockQueryFn ).toHaveBeenCalled()
    } )

    const queryCache = client.getQueryCache()
    const queries = queryCache.findAll( { queryKey: [ '/api/categories', { slug: 'women' } ] } )

    expect( queries ).toHaveLength( 1 )
  } )
} )

describe( 'usePaginatedApiQuery', () => {
  test( 'returns paginated data', async () => {
    mockQueryFn.mockResolvedValue( { items: [], nextPage: 2 } )

    const client = new QueryClient( { defaultOptions: { queries: { retry: false } } } )

    const { result } = renderHook(
      () => usePaginatedApiQuery<{ items: Array<unknown>; nextPage?: number }>( {
        endpoint         : '/api/products',
        params           : {},
        getNextPageParam : ( lastPage ) => lastPage.nextPage,
        initialPageParam : 1,
      } ),
      { wrapper: createWrapper( client ) },
    )

    await waitFor( () => {
      expect( result.current.isSuccess ).toBe( true )
    } )

    expect( result.current.data ).toBeDefined()
    expect( result.current.data?.pages ).toHaveLength( 1 )
    expect( result.current.data?.pages[0] ).toStrictEqual( { items: [], nextPage: 2 } )
  } )

  test( 'queryFn receives pageParam', async () => {
    const client = new QueryClient( { defaultOptions: { queries: { retry: false } } } )

    renderHook(
      () => usePaginatedApiQuery<{ items: Array<unknown> }>( {
        endpoint         : '/api/products',
        params           : {},
        getNextPageParam : () => undefined,
        initialPageParam : 1,
        pageParamKey     : 'page',
      } ),
      { wrapper: createWrapper( client ) },
    )

    await waitFor( () => {
      expect( mockQueryFn ).toHaveBeenCalled()
    } )

    expect( mockQueryFn ).toHaveBeenCalledWith( expect.anything() )
  } )
} )
