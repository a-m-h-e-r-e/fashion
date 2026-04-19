import { getServerCatalogContext } from '@/lib/backend/supabase'
import {
  getCategoriesAndProducts,
  getFiltersByCategory,
  getProductPageData,
  getProductsForList,
} from '@/lib/backend/queries'
import { sortProductsByType, toSizes } from '@/lib/backend/catalog'
import type {
  CategoriesResponse,
  FiltersResponse,
  Product,
  ProductsResponse,
  SizeOptionsResponse,
} from '@/lib/types'

const emptyHomeData = (): {
  bargainProductsData : ProductsResponse
  categoriesData      : CategoriesResponse
  premiumProductsData : ProductsResponse
  sizesData           : SizeOptionsResponse
} => ( {
  bargainProductsData : {
    products : [],
    total    : 0,
  },
  categoriesData      : { categories: [] },
  premiumProductsData : {
    products : [],
    total    : 0,
  },
  sizesData : { sizes: [] },
} )

/**
 * Loads home page catalog data in-process (avoids server → localhost API round-trips).
 */
const loadHomePageData = async (): Promise<{
  bargainProductsData : ProductsResponse
  categoriesData      : CategoriesResponse
  premiumProductsData : ProductsResponse
  sizesData           : SizeOptionsResponse
}> => {
  const context = getServerCatalogContext()

  if ( !context.isEnabled ) {
    return emptyHomeData()
  }

  const { categories, products } = await getCategoriesAndProducts(
    context.client,
    context.defaultBranch,
  )
  const bargainSorted = sortProductsByType( products, 'bargain' )
  const premiumSorted = sortProductsByType( products, 'premium' )

  return {
    bargainProductsData : {
      products : bargainSorted.slice( 0, 8 ),
      total    : bargainSorted.length,
    },
    categoriesData      : { categories },
    premiumProductsData : {
      products : premiumSorted.slice( 0, 8 ),
      total    : premiumSorted.length,
    },
    sizesData : { sizes: toSizes( products ) },
  }
}

/**
 * Product detail + related list (same behavior as /api/products routes).
 */
const loadProductPageData = async ( id: string ): Promise<{
  product         : Product
  relatedProducts : Array<Product>
}> => {
  const context = getServerCatalogContext()

  if ( !context.isEnabled ) {
    throw new Error( 'Backend disabled' )
  }

  const { product, relatedProducts } = await getProductPageData(
    context.client,
    context.defaultBranch,
    { productId: id },
  )

  if ( !product ) {
    throw new Error( 'Not found' )
  }

  return {
    product,
    relatedProducts,
  }
}

/**
 * Category search page: categories tree, filters, and products.
 */
const loadCategoryPageData = async (
  categorySlug: string,
): Promise<{
  categoriesData : CategoriesResponse
  filtersData    : FiltersResponse
  productsData   : ProductsResponse
}> => {
  const context = getServerCatalogContext()

  if ( !context.isEnabled ) {
    return {
      categoriesData : { categories: [] },
      filtersData    : { filters: [] },
      productsData   : {
        products : [],
        total    : 0,
      },
    }
  }

  const [ categoriesBlock, filters, productsBlock ] = await Promise.all( [
    getCategoriesAndProducts( context.client, context.defaultBranch ),
    getFiltersByCategory( context.client, context.defaultBranch, categorySlug ),
    getProductsForList( context.client, context.defaultBranch, {
      branchStockSnapshot : undefined,
      categorySlug,
      limit               : 20,
      type                : null,
    } ),
  ] )

  return {
    categoriesData : { categories: categoriesBlock.categories },
    filtersData    : { filters },
    productsData   : productsBlock,
  }
}

export { loadCategoryPageData, loadHomePageData, loadProductPageData }
