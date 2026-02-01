import { expect, test, describe } from 'vitest'
import httpClient from './http-client'

describe( 'httpClient', () => {
  test( 'is an axios instance with expected defaults', () => {
    const { defaults } = httpClient
    const { headers } = defaults

    expect( defaults.timeout )
      .toBe( 10000 )
    expect( defaults.maxRedirects )
      .toBe( 5 )
    expect( defaults.withCredentials )
      .toBe( true )
    expect( headers )
      .toBeDefined()
    expect( headers['Content-Type'] )
      .toBe( 'application/json' )
  } )

  test( 'validateStatus accepts 2xx', () => {
    const { validateStatus } = httpClient.defaults

    expect( validateStatus )
      .toBeDefined()
    expect( validateStatus!( 200 ) )
      .toBe( true )
    expect( validateStatus!( 299 ) )
      .toBe( true )
  } )

  test( 'validateStatus rejects non-2xx', () => {
    const { validateStatus } = httpClient.defaults

    expect( validateStatus!( 199 ) )
      .toBe( false )
    expect( validateStatus!( 300 ) )
      .toBe( false )
    expect( validateStatus!( 404 ) )
      .toBe( false )
  } )

  test( 'has request and response interceptors', () => {
    expect( httpClient.interceptors.request )
      .toBeDefined()
    expect( httpClient.interceptors.response )
      .toBeDefined()
  } )
} )
