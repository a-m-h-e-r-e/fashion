/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable camelcase */
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Category, Product } from '@/lib/types'
import {
  categoryAndDescendantIds,
  DEFAULT_PRODUCT_SELECT,
  LIST_PRODUCT_SELECT,
  flattenCategories,
  sortProductsByType,
  toCategories,
  toFashionListProduct,
  toFashionProduct,
  toFilters,
  toSizes,
  type CategoryRow,
  type ProductListRow,
  type ProductRow,
} from './catalog'

/**
 * When true and a default branch is set, hide products if branch_stock yields no IDs.
 * Default false: if stock data is missing or empty, fall back to all active products (typical local/dev).
 */
const useStrictBranchStock = 'true' === String( process.env.FASHION_STRICT_BRANCH_STOCK ?? '' )
  .toLowerCase()

type PublicBranchVariantStockRow = {
  product_id : string
  quantity   : number
  sku        : string
}

const BRANCH_STOCK_PAGE_SIZE = 1000

type BranchStockSnapshot = {
  availableIds  : Set<string>
  quantityBySku : Map<string, number>
}

type ProductPageRpcVariantRow = {
  attributes     : Record<string, string> | null
  image_url      : string | null
  purchase_price : number
  selling_price  : number
  sku            : string
  stock          : number
}

type ProductPageRpcProductRow = {
  category_id      : string
  category_name    : string
  created_at       : string
  id               : string
  image_url        : string | null
  name             : string
  product_variants : Array<ProductPageRpcVariantRow>
  purchase_price   : number
  selling_price    : number
  description?     : string | null
}

type ProductPageRpcResult = {
  product          : ProductPageRpcProductRow | null
  related_products : Array<{
    category_id    : string
    category_name  : string
    created_at     : string
    id             : string
    image_url      : string | null
    name           : string
    purchase_price : number
    selling_price  : number
  }>
}

const formatSupabaseConfigHint = ( message: string ): string => {
  if ( !( /invalid api key|jwt|malformed/i ).test( message ) ) {
    return ''
  }

  return ' Check NEXT_PUBLIC_SUPABASE_URL and keys in .env (Supabase Dashboard → Project Settings → API). Server-side catalog should set SUPABASE_SERVICE_ROLE_KEY (service_role) when using branch stock or RLS.'
}

const getBranchVariantStock = async (
  client: SupabaseClient,
  branchRef: string,
): Promise<Array<PublicBranchVariantStockRow>> => {
  const normalizedRef = branchRef.trim()

  if ( 0 === normalizedRef.length ) {
    return []
  }

  const rpcArgs = Object.fromEntries( [ [ 'p_branch_ref', normalizedRef ] ] )
  const rows: Array<PublicBranchVariantStockRow> = []

  for ( let from = 0; ; from += BRANCH_STOCK_PAGE_SIZE ) {
    // Supabase RPC responses are capped, so fetch branch stock in deterministic pages.
    // eslint-disable-next-line no-await-in-loop
    const { data, error } = await client
      .rpc( 'get_public_branch_variant_stock', rpcArgs )
      .range( from, from + BRANCH_STOCK_PAGE_SIZE - 1 )

    if ( error ) {
      throw new Error(
        `Failed to fetch public branch stock for "${ normalizedRef }": ${ error.message }.${ formatSupabaseConfigHint( error.message ) }`,
      )
    }

    const page = ( data ?? [] ) as Array<PublicBranchVariantStockRow>

    rows.push( ...page )

    if ( page.length < BRANCH_STOCK_PAGE_SIZE ) {
      break
    }
  }

  return rows
}

const toBranchStockSnapshot = (
  rows: Array<PublicBranchVariantStockRow>,
): BranchStockSnapshot => {
  const quantityBySku = new Map<string, number>()
  const availableIds = new Set<string>()

  for ( const row of rows ) {
    quantityBySku.set( row.sku, row.quantity ?? 0 )

    if ( 0 < ( row.quantity ?? 0 ) ) {
      availableIds.add( row.product_id )
    }
  }

  return {
    availableIds,
    quantityBySku,
  }
}

const getBranchStockSnapshot = async (
  client: SupabaseClient,
  defaultBranch: string,
): Promise<BranchStockSnapshot> => toBranchStockSnapshot(
  await getBranchVariantStock( client, defaultBranch ),
)

const getProductPageData = async (
  client: SupabaseClient,
  defaultBranch: string,
  options: {
    productId     : string
    relatedLimit? : number
  },
): Promise<{
  product         : Product | null
  relatedProducts : Array<Product>
}> => {
  const normalizedId = options.productId.trim()
  const relatedLimit = options.relatedLimit ?? 8

  if ( 0 === normalizedId.length ) {
    return {
      product         : null,
      relatedProducts : [],
    }
  }

  const { data, error } = await client.rpc( 'get_public_product_page_data', {
    p_branch_ref          : defaultBranch.trim(),
    p_product_id          : normalizedId,
    p_related_limit       : relatedLimit,
    p_strict_branch_stock : useStrictBranchStock,
  } )

  if ( error ) {
    throw new Error(
      `Failed to fetch product page data for "${ normalizedId }": ${ error.message }.${ formatSupabaseConfigHint( error.message ) }`,
    )
  }

  const payload = ( data ?? null ) as ProductPageRpcResult | null

  if ( !payload?.product ) {
    return {
      product         : null,
      relatedProducts : [],
    }
  }

  let productDescription: string | null = null
  const { data: descriptionRow } = await client
    .from( 'products' )
    .select( 'description' )
    .eq( 'id', normalizedId )
    .maybeSingle()

  if ( 'string' === typeof descriptionRow?.description ) {
    productDescription = descriptionRow.description
  }

  const quantityBySku = new Map<string, number>()

  for ( const variant of payload.product.product_variants ?? [] ) {
    quantityBySku.set( variant.sku, variant.stock ?? 0 )
  }

  const productRow: ProductRow = {
    categories : {
      id   : payload.product.category_id,
      name : payload.product.category_name,
    },
    category_id      : payload.product.category_id,
    created_at       : payload.product.created_at,
    description      : payload.product.description ?? productDescription,
    id               : payload.product.id,
    image_url        : payload.product.image_url,
    name             : payload.product.name,
    product_variants : payload.product.product_variants.map( ( variant ) => ( {
      attributes     : variant.attributes,
      image_url      : variant.image_url,
      purchase_price : variant.purchase_price,
      selling_price  : variant.selling_price,
      sku            : variant.sku,
    } ) ),
    purchase_price : payload.product.purchase_price,
    selling_price  : payload.product.selling_price,
  }

  const relatedProducts = payload.related_products.map( ( row ) => toFashionListProduct( {
    categories : {
      id   : row.category_id,
      name : row.category_name,
    },
    category_id    : row.category_id,
    created_at     : row.created_at,
    id             : row.id,
    image_url      : row.image_url,
    name           : row.name,
    purchase_price : row.purchase_price,
    selling_price  : row.selling_price,
  }, quantityBySku ) )

  return {
    product : toFashionProduct( productRow, quantityBySku ),
    relatedProducts,
  }
}

const getAllProducts = async (
  client: SupabaseClient,
  defaultBranch: string,
  branchStockSnapshot?: BranchStockSnapshot,
): Promise<{
  products      : Array<ProductRow>
  quantityBySku : Map<string, number>
}> => {
  const snapshot = branchStockSnapshot ?? await getBranchStockSnapshot( client, defaultBranch )
  const { availableIds, quantityBySku } = snapshot

  if (
    useStrictBranchStock
    && 0 === availableIds.size
    && 0 < defaultBranch.trim().length
  ) {
    return {
      products      : [],
      quantityBySku : new Map(),
    }
  }

  let query = client
    .from( 'products' )
    .select( DEFAULT_PRODUCT_SELECT )
    .eq( 'status', 'active' )
    .order( 'created_at', { ascending: false } )

  if ( 0 < availableIds.size ) {
    query = query.in( 'id', [ ...availableIds ] )
  }

  const { data, error } = await query

  if ( error ) {
    throw new Error(
      `Failed to fetch products: ${ error.message }.${ formatSupabaseConfigHint( error.message ) }`,
    )
  }

  const products = ( data ?? [] ) as unknown as Array<ProductRow>

  return {
    products,
    quantityBySku,
  }
}

const getCategoriesAndProducts = async (
  client: SupabaseClient,
  defaultBranch: string,
  branchStockSnapshot?: BranchStockSnapshot,
): Promise<{
  categories : Array<Category>
  products   : Array<Product>
}> => {
  const [ categoryResult, productsResult ] = await Promise.all( [
    client
      .from( 'categories' )
      .select( 'id, name' )
      .order( 'name', { ascending: true } ),
    getAllProducts( client, defaultBranch, branchStockSnapshot ),
  ] )

  if ( categoryResult.error ) {
    throw new Error(
      `Failed to fetch categories: ${ categoryResult.error.message }.${ formatSupabaseConfigHint( categoryResult.error.message ) }`,
    )
  }

  const { products: productRows, quantityBySku } = productsResult
  const categories = toCategories(
    ( categoryResult.data ?? [] ) as Array<CategoryRow>,
    productRows,
  )
  const products = productRows.map( ( row ) => toFashionProduct( row, quantityBySku ) )

  return {
    categories,
    products,
  }
}

const getProductsForList = async (
  client: SupabaseClient,
  defaultBranch: string,
  options: {
    branchStockSnapshot : BranchStockSnapshot | undefined
    categorySlug        : string | null
    limit               : number
    type                : string | null
  },
): Promise<{
  products : Array<Product>
  total    : number
}> => {
  const { categories, products } = await getCategoriesAndProducts(
    client,
    defaultBranch,
    options.branchStockSnapshot,
  )

  let filtered = products

  if ( options.categorySlug ) {
    const categoryIds = categoryAndDescendantIds( categories, options.categorySlug )

    filtered = filtered.filter( ( product ) => categoryIds.has( product.categoryId ) )
  }

  const sorted = sortProductsByType( filtered, options.type )

  return {
    products : sorted.slice( 0, options.limit ),
    total    : sorted.length,
  }
}

const getProductById = async (
  client: SupabaseClient,
  defaultBranch: string,
  options: {
    branchStockSnapshot : BranchStockSnapshot | undefined
    productId           : string
  },
): Promise<Product | null> => {
  const normalizedId = options.productId.trim()

  if ( 0 === normalizedId.length ) {
    return null
  }

  const snapshot = options.branchStockSnapshot ?? await getBranchStockSnapshot( client, defaultBranch )
  const { availableIds, quantityBySku } = snapshot

  if (
    useStrictBranchStock
    && 0 === availableIds.size
    && 0 < defaultBranch.trim().length
  ) {
    return null
  }

  if ( 0 < availableIds.size && !availableIds.has( normalizedId ) ) {
    return null
  }

  const { data, error } = await client
    .from( 'products' )
    .select( DEFAULT_PRODUCT_SELECT )
    .eq( 'id', normalizedId )
    .eq( 'status', 'active' )
    .maybeSingle()

  if ( error ) {
    throw new Error(
      `Failed to fetch product "${ normalizedId }": ${ error.message }.${ formatSupabaseConfigHint( error.message ) }`,
    )
  }

  if ( !data ) {
    return null
  }

  return toFashionProduct( data as unknown as ProductRow, quantityBySku )
}

const getRelatedProducts = async (
  client: SupabaseClient,
  defaultBranch: string,
  options: {
    branchStockSnapshot : BranchStockSnapshot | undefined
    categoryId          : string
    excludeId           : string
    limit               : number
  },
): Promise<Array<Product>> => {
  const snapshot = options.branchStockSnapshot ?? await getBranchStockSnapshot( client, defaultBranch )
  const { availableIds, quantityBySku } = snapshot

  if (
    useStrictBranchStock
    && 0 === availableIds.size
    && 0 < defaultBranch.trim().length
  ) {
    return []
  }

  let query = client
    .from( 'products' )
    .select( LIST_PRODUCT_SELECT )
    .eq( 'status', 'active' )
    .neq( 'id', options.excludeId )
    .eq( 'category_id', options.categoryId )
    .order( 'created_at', { ascending: false } )
    .limit( options.limit * 2 )

  if ( 0 < availableIds.size ) {
    query = query.in( 'id', [ ...availableIds ] )
  }

  const { data, error } = await query

  if ( error ) {
    throw new Error(
      `Failed to fetch related products for "${ options.excludeId }": ${ error.message }.${ formatSupabaseConfigHint( error.message ) }`,
    )
  }

  const rows = ( data ?? [] ) as unknown as Array<ProductListRow>

  return rows
    .map( ( row ) => toFashionListProduct( row, quantityBySku ) )
    .slice( 0, options.limit )
}

const getCategoryBySlug = async (
  client: SupabaseClient,
  defaultBranch: string,
  slug: string,
): Promise<Category | null> => {
  const { categories } = await getCategoriesAndProducts( client, defaultBranch )
  const flat = flattenCategories( categories )

  return flat.find( ( category ) => category.slug === slug ) ?? null
}

const getFiltersByCategory = async (
  client: SupabaseClient,
  defaultBranch: string,
  categorySlug: string | null,
) => {
  const { products } = await getProductsForList( client, defaultBranch, {
    branchStockSnapshot : undefined,
    categorySlug,
    limit               : 500,
    type                : null,
  } )

  return toFilters( products )
}

const getSizes = async (
  client: SupabaseClient,
  defaultBranch: string,
) => {
  const { products } = await getProductsForList( client, defaultBranch, {
    branchStockSnapshot : undefined,
    categorySlug        : null,
    limit               : 500,
    type                : null,
  } )

  return toSizes( products )
}

export {
  BRANCH_STOCK_PAGE_SIZE,
  getBranchStockSnapshot,
  getBranchVariantStock,
  getCategoriesAndProducts,
  getCategoryBySlug,
  getFiltersByCategory,
  getProductById,
  getProductPageData,
  getProductsForList,
  getRelatedProducts,
  getSizes,
}
