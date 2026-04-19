import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getSizes } from '@/lib/backend/queries'

export async function GET() {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const sizes = await getSizes( context.client, context.defaultBranch )

    return NextResponse.json( { sizes } )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch sizes' },
      { status: 500 },
    )
  }
}
