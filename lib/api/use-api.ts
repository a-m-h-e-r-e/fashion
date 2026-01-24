import { type AxiosRequestConfig } from 'axios'
import queryFunction from './query-function'
import { useQuery, useInfiniteQuery } from '@tanstack/react-query'

type IConfig = object

type IArgs<T> = {
  endpoint                 : string
  config?                  : IConfig
  httpClientConfiguration? : AxiosRequestConfig
  onError?                 : ( error: Error ) => void
  onSuccess?               : ( data: T ) => void
  params?                  : Record<string, boolean | number | string>
  refreshEndpoints?        : Array<string>
}

type IPaginatedArgs<T> = IArgs<T> & {
  getNextPageParam      : ( lastPage: T, allPages: Array<T> ) => number | undefined
  getPreviousPageParam? : ( firstPage: T, allPages: Array<T> ) => number | undefined
  initialPageParam?     : number
  pageParamKey?         : string
}

const useApiQuery = <T>( {
  endpoint,
  httpClientConfiguration,
  params = {},
  config = {},
}: IArgs<T> ) => useQuery( {
  queryFn : queryFunction<T>( {
    endpoint,
    httpClientConfiguration,
    method : 'get',
    params,
  } ),
  queryKey : [ endpoint, params ],
  ...config,
} )

const usePaginatedApiQuery = <T>( {
  endpoint,
  httpClientConfiguration,
  params = {},
  config = {},
  getNextPageParam,
  getPreviousPageParam,
  initialPageParam = 1,
  pageParamKey = 'page',
}: IPaginatedArgs<T> ) => useInfiniteQuery( {
  getNextPageParam,
  getPreviousPageParam,
  initialPageParam,
  queryFn : async ( { pageParam } ) => await queryFunction<T>( {
    endpoint,
    httpClientConfiguration,
    method : 'get',
    params : {
      ...params,
      [pageParamKey] : pageParam,
    },
  } )( {} as unknown ),
  queryKey : [ endpoint, params ],
  ...config,
} )

export { useApiQuery, usePaginatedApiQuery }
