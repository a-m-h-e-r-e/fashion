import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getProductsForList } from '@/lib/backend/queries'

export async function GET( request: Request ) {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const url = new URL( request.url )
    const type = url.searchParams.get( 'type' )
    const category = url.searchParams.get( 'category' )
    const requestedLimit = Number.parseInt( url.searchParams.get( 'limit' ) ?? '10', 10 )
    const limit = Number.isFinite( requestedLimit ) && 0 < requestedLimit
      ? Math.min( requestedLimit, 100 )
      : 10

    const result = await getProductsForList( context.client, context.defaultBranch, {
      branchStockSnapshot : undefined,
      categorySlug        : category,
      limit,
      type,
    } )

    return NextResponse.json( result )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch products' },
      { status: 500 },
    )
  }
}
