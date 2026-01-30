import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { SearchPageClient } from '@/components/search/search-page-client'
import type {
  CategoriesResponse,
  ProductsResponse,
  FiltersResponse,
  Category,
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

// Find category by slug (including nested categories)
const findCategoryBySlug = ( categories: Array<Category>, slug: string ): Category | null => {
  for ( const cat of categories ) {
    if ( cat.slug === slug ) {
      return cat
    }

    if ( cat.children ) {
      const found = findCategoryBySlug( cat.children, slug )

      if ( found ) {
        return found
      }
    }
  }

  return null
}

// Get parent category for a given category
const getParentCategory = ( categories: Array<Category>, category: Category ): Category | null => {
  if ( null === category.parentId ) {
    return null
  }

  for ( const cat of categories ) {
    if ( cat.id === category.parentId ) {
      return cat
    }

    if ( cat.children ) {
      const found = cat.children.find( ( child ) => child.id === category.parentId )

      if ( found ) {
        return cat
      }
    }
  }

  return null
}

interface CategoryPageProps {
  params: Promise<{
    category : string
    locale   : string
  }>
}

export default async function CategoryPage( { params }: CategoryPageProps ) {
  const { locale, category: categorySlug } = await params

  setRequestLocale( locale )

  const t = await getTranslations()

  // Fetch category data
  const categoriesData = await fetchData<CategoriesResponse>( '/api/categories' )

  // Find the requested category
  const category = findCategoryBySlug( categoriesData.categories, categorySlug )

  if ( !category ) {
    notFound()
  }

  // Determine if this is a parent or child category
  const isParentCategory = null === category.parentId
  const parentCategory = isParentCategory ? category : getParentCategory( categoriesData.categories, category )

  // Get subcategories to display
  const subcategories = isParentCategory
    ? category.children ?? []
    : parentCategory?.children ?? []

  // Fetch filters and products in parallel
  const [ filtersData, productsData ] = await Promise.all( [
    fetchData<FiltersResponse>( `/api/filters?category=${ categorySlug }` ),
    fetchData<ProductsResponse>( `/api/products?category=${ categorySlug }&limit=20` ),
  ] )

  // Get translated category name
  const categoryName = t( category.name )

  return (
    <SearchPageClient
      category={ parentCategory ?? category }
      categoryName={ categoryName }
      filters={ filtersData.filters }
      products={ productsData.products }
      subcategories={ subcategories }
      totalProducts={ productsData.total }
    />
  )
}
// Generate static params for all categories
/* eslint-disable @typescript-eslint/require-await, require-await */
export async function generateStaticParams() {
  // This would typically fetch from API, but for static generation
  // we'll return the known category slugs
  const categorySlugs = [
    'women',
    'men',
    'children',
    'accessories',
    'sports',
    'women-dresses',
    'women-tops',
    'women-jeans',
    'women-jumpers',
    'women-sweatshirts',
    'women-coats',
    'women-shoes',
    'men-shirts',
    'men-trousers',
    'men-jeans',
    'men-suits',
    'men-shoes',
    'children-girls',
    'children-boys',
    'accessories-bags',
    'accessories-jewelry',
    'accessories-watches',
    'sports-activewear',
    'sports-sneakers',
  ]

  return categorySlugs.map( ( category ) => ( { category } ) )
}
