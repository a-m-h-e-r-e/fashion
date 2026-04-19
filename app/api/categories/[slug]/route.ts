import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getCategoryBySlug } from '@/lib/backend/queries'

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } },
) {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const category = await getCategoryBySlug(
      context.client,
      context.defaultBranch,
      params.slug,
    )

    if ( !category ) {
      return NextResponse.json( { error: 'Category not found' }, { status: 404 } )
    }

    return NextResponse.json( { category } )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch category' },
      { status: 500 },
    )
  }
}
