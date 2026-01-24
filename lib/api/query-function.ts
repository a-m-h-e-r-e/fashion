import { type AxiosRequestConfig } from 'axios'
import httpClient from './http-client'

export type IMethod = 'delete' | 'get' | 'patch' | 'post' | 'put'

type IArgs = {
  endpoint                 : string
  method                   : IMethod
  httpClientConfiguration? : AxiosRequestConfig
  params?                  : Record<string, boolean | number | string | undefined>
}

const queryFunction = <T, P = unknown>( {
  endpoint,
  method,
  params,
  httpClientConfiguration = undefined,
}: IArgs ) => async ( args: P ): Promise<T> => {
  const { id, queryKey, ...rest } = params ?? {}

  const isGet = 'get' === method

  let url = undefined === id ? endpoint : `${ endpoint }/${ id }`

  if ( isGet && 0 < Object.keys( rest ).length ) {
    url += `?${ new URLSearchParams( rest as Record<string, string> )
      .toString() }`
  }

  const data = undefined === queryKey ? rest : args

  const response = isGet
    ? await httpClient[method]( url, httpClientConfiguration )
    : await httpClient[method](
      url,
      {
        ...rest,
        ...( data as object ),
      },
      httpClientConfiguration,
    )

  return response.data
}

export default queryFunction
