import createMiddleware from 'next-intl/middleware'
import { NextResponse } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware( routing )
const BRANCH_COOKIE_NAME = 'fashion_branch'
const localeSet = new Set( routing.locales )
const ignoredPathPrefixSet = new Set( [ 'api', '_next' ] )

const parseBranchFromPathname = ( pathname: string ): string => {
  const segments = pathname.split( '/' )
    .filter( ( segment ) => 0 < segment.length )

  if ( 0 === segments.length ) {
    return ''
  }

  const [ firstSegment, secondSegment ] = segments

  if ( localeSet.has( firstSegment as typeof routing.locales[number] ) || ignoredPathPrefixSet.has( firstSegment ) ) {
    return ''
  }

  if ( secondSegment && localeSet.has( secondSegment as typeof routing.locales[number] ) ) {
    return firstSegment
  }

  return ''
}

export default function middleware( request: Parameters<typeof intlMiddleware>[0] ) {
  const response = intlMiddleware( request )
  const branchFromPath = parseBranchFromPathname( request.nextUrl.pathname )

  if ( 0 < branchFromPath.length ) {
    const rewrittenUrl = request.nextUrl.clone()
    const segments = rewrittenUrl.pathname.split( '/' )
      .filter( ( segment ) => 0 < segment.length )

    rewrittenUrl.pathname = `/${ segments.slice( 1 )
      .join( '/' ) }`

    const requestHeaders = new Headers( request.headers )

    requestHeaders.set( 'x-fashion-branch', encodeURIComponent( branchFromPath ) )

    const rewrittenResponse = NextResponse.rewrite( rewrittenUrl, { request: { headers: requestHeaders } } )

    rewrittenResponse.cookies.set( BRANCH_COOKIE_NAME, encodeURIComponent( branchFromPath ), {
      maxAge : 60 * 60 * 24 * 14,
      path   : '/',
    } )

    return rewrittenResponse
  }

  return response
}
export const config = {
  matcher : [
    // Match all pathnames except for
    // - API routes
    // - _next (Next.js internals)
    // - Static files
    '/((?!api|_next|.*\\..*).*)',
  ],
}
