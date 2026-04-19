import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getFiltersByCategory } from '@/lib/backend/queries'

export async function GET( request: Request ) {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const url = new URL( request.url )
    const category = url.searchParams.get( 'category' )
    const filters = await getFiltersByCategory(
      context.client,
      context.defaultBranch,
      category,
    )

    return NextResponse.json( { filters } )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch filters' },
      { status: 500 },
    )
  }
}
