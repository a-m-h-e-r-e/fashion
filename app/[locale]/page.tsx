import { setRequestLocale } from 'next-intl/server'
import {
  CategoryGrid,
  DesktopHeader,
  Footer,
  HeroSection,
  BrandsMarquee,
  SizeFilterGrid,
  ProductGrid,
  BottomNavigation,
} from '@/components/home'
import type {
  CategoriesResponse,
  ProductsResponse,
  SizeOptionsResponse,
} from '@/lib/types'

// Fetch helper for server-side data fetching
const fetchData = async <T,>( endpoint: string ): Promise<T> => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'
  const response = await fetch( `${ baseUrl }${ endpoint }`, { cache: 'no-store' } )

  if ( !response.ok ) {
    throw new Error( `Failed to fetch ${ endpoint }` )
  }

  return response.json() as Promise<T>
}

export default async function Home( { params }: { params: Promise<{ locale: string }> } ) {
  const { locale } = await params

  setRequestLocale( locale )

  // Fetch all data in parallel
  const [
    categoriesData,
    bargainProductsData,
    premiumProductsData,
    sizesData,
  ] = await Promise.all( [
    fetchData<CategoriesResponse>( '/api/categories' ),
    fetchData<ProductsResponse>( '/api/products?type=bargain&limit=8' ),
    fetchData<ProductsResponse>( '/api/products?type=premium&limit=8' ),
    fetchData<SizeOptionsResponse>( '/api/sizes' ),
  ] )

  return (
    <div className='noise-overlay min-h-screen'>
      {/* Desktop Header - Only visible on lg+ */}
      <DesktopHeader activeItem='home' />

      {/* Hero Section */}
      <HeroSection />

      {/* Brands Marquee */}
      <BrandsMarquee className='mb-12 lg:mb-16' />

      <main className='pb-24 lg:pb-16'>
        {/* Categories Section */}
        <section className='mx-auto max-w-7xl px-4 lg:px-8'>
          <CategoryGrid
            categories={ categoriesData.categories }
            className='mb-12 stagger-children lg:mb-16'
          />
        </section>

        {/* Shop by Size */}
        <section className='mx-auto mb-12 max-w-7xl px-4 lg:mb-16 lg:px-8'>
          <div className='animate-fade-in-up'>
            <SizeFilterGrid sizes={ sizesData.sizes } />
          </div>
        </section>

        {/* Products Sections */}
        <section className='mx-auto max-w-7xl px-4 lg:px-8'>
          <div className='space-y-12 lg:space-y-16'>
            {/* Bargain Products Section */}
            <ProductGrid
              className='animate-fade-in-up'
              href='/products?type=bargain'
              products={ bargainProductsData.products }
              titleKey='products.bargainTitle'
            />

            {/* Premium Products Section */}
            <ProductGrid
              className='animate-fade-in-up'
              href='/products?type=premium'
              products={ premiumProductsData.products }
              titleKey='products.premiumTitle'
            />
          </div>
        </section>

      </main>

      <Footer />

      {/* Bottom Navigation - Hidden on desktop */}
      <BottomNavigation activeItem='home' />
    </div>
  )
}
