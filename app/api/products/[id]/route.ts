import { NextResponse } from 'next/server'
import { getServerCatalogContext } from '@/lib/backend/supabase'
import { getProductById } from '@/lib/backend/queries'

export async function GET(
  _request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const context = getServerCatalogContext()

    if ( !context.isEnabled ) {
      return NextResponse.json( { error: 'Ostock backend is disabled' }, { status: 503 } )
    }

    const product = await getProductById(
      context.client,
      context.defaultBranch,
      {
        branchStockSnapshot : undefined,
        productId           : params.id,
      },
    )

    if ( !product ) {
      return NextResponse.json( { error: 'Product not found' }, { status: 404 } )
    }

    return NextResponse.json( { product } )
  } catch ( error ) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch product' },
      { status: 500 },
    )
  }
}
