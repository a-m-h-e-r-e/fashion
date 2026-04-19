import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getCategoriesAndProducts } from '@/lib/backend/queries'

export async function GET() {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const { categories } = await getCategoriesAndProducts(
      context.client,
      context.defaultBranch,
    )

    return NextResponse.json( { categories } )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}
