import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProductDetailClient } from '@/components/product'
import type { Product } from '@/lib/types'
import { loadProductPageData } from '@/lib/server/catalog-data'

export const revalidate = 5

interface ProductPageProps {
  params: Promise<{
    id     : string
    locale : string
  }>
}

export default async function ProductPage( { params }: ProductPageProps ) {
  const { locale, id } = await params

  setRequestLocale( locale )

  let product: Product
  let relatedProducts: Array<Product>

  try {
    ( { product, relatedProducts } = await loadProductPageData( id ) )
  } catch {
    notFound()
  }

  return (
    <ProductDetailClient
      product={ product }
      relatedProducts={ relatedProducts }
    />
  )
}
export async function generateStaticParams() {
  return []
}
