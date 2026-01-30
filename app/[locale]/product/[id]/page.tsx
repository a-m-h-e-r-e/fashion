import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product'
import type { Product, ProductsResponse } from '@/lib/types'

interface ProductResponse { product: Product }

// Fetch helper for server-side data fetching
const fetchData = async <T,>( endpoint: string ): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
  const response = await fetch( `${ baseUrl }${ endpoint }`, { cache: 'no-store' } )

  if ( !response.ok ) {
    throw new Error( `Failed to fetch ${ endpoint }` )
  }

  return response.json() as Promise<T>
}

interface ProductPageProps {
  params: Promise<{
    id     : string
    locale : string
  }>
}

export default async function ProductPage( { params }: ProductPageProps ) {
  const { locale, id } = await params

  setRequestLocale( locale )

  // Fetch product data
  let product: Product

  try {
    ( { product } = await fetchData<ProductResponse>( `/api/products/${ id }` ) )
  } catch {
    notFound()
  }

  // Fetch related products (same category)
  const relatedData = await fetchData<ProductsResponse>(
    '/api/products?limit=8',
  )

  // Filter out current product from related
  const relatedProducts = relatedData.products.filter( ( productItem ) => productItem.id !== id )

  return (
    <ProductDetailClient
      product={ product }
      relatedProducts={ relatedProducts }
    />
  )
}
// Generate static params for known products
export async function generateStaticParams() {
  const productIds = [
    'prod-1',
    'prod-2',
    'prod-3',
    'prod-4',
    'prod-5',
    'prod-6',
    'prod-p1',
    'prod-p2',
    'prod-p3',
    'prod-p4',
    'prod-p5',
    'prod-p6',
  ]

  return productIds.map( ( id ) => ( { id } ) )
}
