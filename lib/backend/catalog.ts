/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable id-length, complexity, prefer-destructuring */
import type {
  Category,
  Product,
  FilterConfig,
  FilterOption,
  SizeOption,
} from '@/lib/types'

const FALLBACK_CATEGORY_IMAGE = 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop'
const FALLBACK_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop'
const FALLBACK_SIZE_IMAGE = 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=200&h=200&fit=crop'

type CategoryRow = {
  id   : string
  name : string
}

type ProductVariantRow = {
  attributes     : Record<string, string> | null
  image_url      : string | null
  purchase_price : number
  selling_price  : number
  sku            : string
}

type NormalizedVariant = {
  attributes    : Record<string, string>
  imageUrl      : string | null
  isAvailable   : boolean
  originalPrice : number | null
  price         : number
  sku           : string
  stock         : number
}

type ProductRow = {
  category_id      : string
  categories       : Array<CategoryRow> | CategoryRow | null
  created_at       : string
  description      : string | null
  id               : string
  image_url        : string | null
  name             : string
  product_variants : Array<ProductVariantRow>
  purchase_price   : number
  selling_price    : number
}

type ProductListRow = {
  category_id    : string
  categories     : Array<CategoryRow> | CategoryRow | null
  created_at     : string
  id             : string
  image_url      : string | null
  name           : string
  purchase_price : number
  selling_price  : number
}

const CATEGORY_IMAGE_BY_SLUG: Record<string, string> = {
  accessories : 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=400&h=400&fit=crop',
  bags        : 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
  children    : 'https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=400&h=400&fit=crop',
  coats       : 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
  dresses     : 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
  girls       : 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
  jeans       : 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
  men         : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  shoes       : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
  sports      : 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
  sweatshirts : 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
  tops        : 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=400&fit=crop',
  watches     : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
  women       : 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
}

const CATEGORY_KEY_BY_SLUG: Record<string, string> = {
  accessories : 'categories.accessories',
  boys        : 'subcategories.boys',
  children    : 'categories.children',
  coats       : 'subcategories.coats',
  dresses     : 'subcategories.dresses',
  girls       : 'subcategories.girls',
  jeans       : 'subcategories.jeans',
  jewelry     : 'subcategories.jewelry',
  jumpers     : 'subcategories.jumpers',
  men         : 'categories.men',
  shirts      : 'subcategories.shirts',
  shoes       : 'subcategories.shoes',
  sports      : 'categories.sports',
  suits       : 'subcategories.suits',
  sweatshirts : 'subcategories.sweatshirts',
  tops        : 'subcategories.tops',
  trousers    : 'subcategories.trousers',
  watches     : 'subcategories.watches',
  women       : 'categories.women',
}

const slugify = ( value: string ): string => value
  .toLowerCase()
  .replace( /&/g, ' and ' )
  .replace( /[^a-z0-9]+/g, '-' )
  .replace( /(^-|-$)/g, '' )

const toDisplayNameKey = ( categoryName: string, slug: string ): string => {
  const lastSegment = slug.split( '-' )
    .at( -1 ) ?? slug

  return CATEGORY_KEY_BY_SLUG[lastSegment] ?? categoryName
}

const toCategoryImage = ( slug: string ): string => {
  const lastSegment = slug.split( '-' )
    .at( -1 ) ?? slug

  return CATEGORY_IMAGE_BY_SLUG[lastSegment] ?? FALLBACK_CATEGORY_IMAGE
}

const createCategoryNode = ( row: CategoryRow, itemCount: number ): Category => {
  const slug = slugify( row.name )

  return {
    id       : row.id,
    imageUrl : toCategoryImage( slug ),
    itemCount,
    name     : toDisplayNameKey( row.name, slug ),
    parentId : null,
    slug,
  }
}

const splitCategories = ( categories: Array<Category> ): Array<Category> => {
  const bySlug = new Map<string, Category>()

  for ( const category of categories ) {
    bySlug.set( category.slug, category )
  }

  const roots: Array<Category> = []

  for ( const category of categories ) {
    const parts = category.slug.split( '-' )

    if ( 1 === parts.length ) {
      roots.push( category )
      continue
    }

    const parentSlug = parts[0]
    const parent = bySlug.get( parentSlug )

    if ( !parent ) {
      roots.push( category )
      continue
    }

    category.parentId = parent.id
    parent.children = [ ...parent.children ?? [], category ]
  }

  return roots
}

const withAggregatedItemCounts = ( categories: Array<Category> ): Array<Category> => {
  const updateCategory = ( category: Category ): Category => {
    const children = category.children?.map( updateCategory )
    const childItemCount = children?.reduce( ( sum, child ) => sum + child.itemCount, 0 ) ?? 0

    return {
      ...category,
      children,
      itemCount : category.itemCount + childItemCount,
    }
  }

  return categories.map( updateCategory )
}

const flattenCategories = ( categories: Array<Category> ): Array<Category> => categories.flatMap(
  ( category ) => [ category, ...category.children ? flattenCategories( category.children ) : [] ],
)

const categoryAndDescendantIds = ( categories: Array<Category>, slug: string ): Set<string> => {
  const all = flattenCategories( categories )
  const target = all.find( ( category ) => category.slug === slug )

  if ( !target ) {
    return new Set()
  }

  const ids = new Set<string>()
  const queue: Array<Category> = [ target ]

  while ( 0 < queue.length ) {
    const current = queue.shift()

    if ( !current ) {
      continue
    }

    ids.add( current.id )

    if ( current.children ) {
      queue.push( ...current.children )
    }
  }

  return ids
}

const calculateDiscount = ( price: number, originalPrice: number | null ): number | null => {
  if ( null === originalPrice || 0 >= originalPrice || originalPrice <= price ) {
    return null
  }

  return Math.round( ( ( originalPrice - price ) / originalPrice ) * 100 )
}

const normalizeAttributes = ( attributes: Record<string, string> | null ): Record<string, string> => {
  const normalized: Record<string, string> = {}

  for ( const [ key, value ] of Object.entries( attributes ?? {} ) ) {
    const normalizedKey = key.trim()
      .toLowerCase()
    const normalizedValue = String( value ).trim()

    if ( 0 < normalizedKey.length && 0 < normalizedValue.length ) {
      normalized[normalizedKey] = normalizedValue
    }
  }

  return normalized
}

const selectDisplayVariant = ( variants: Array<NormalizedVariant> ): NormalizedVariant | null => variants.find( ( variant ) => variant.isAvailable ) ?? variants[0] ?? null

const getFallbackSizeValue = ( attributes: Record<string, string> ): string => {
  const preferredKeys = [ 'size', 'color', 'wattage', 'capacity', 'storage' ]

  for ( const key of preferredKeys ) {
    const value = attributes[key]

    if ( value ) {
      return value
    }
  }

  const firstValue = Object.values( attributes )[0]

  return firstValue ?? 'N/A'
}

const toFashionProduct = ( row: ProductRow, quantityBySku: ReadonlyMap<string, number> = new Map() ): Product => {
  const variants: Array<NormalizedVariant> = row.product_variants.map( ( variant ) => {
    const price = variant.selling_price
    const originalPriceCandidate = variant.purchase_price
    const originalPrice = originalPriceCandidate > price ? originalPriceCandidate : null
    const quantity = quantityBySku.get( variant.sku ) ?? 0

    return {
      attributes  : normalizeAttributes( variant.attributes ),
      imageUrl    : variant.image_url,
      isAvailable : 0 < quantity,
      originalPrice,
      price,
      sku         : variant.sku,
      stock       : quantity,
    }
  } )
  const variant = selectDisplayVariant( variants )
  const category = Array.isArray( row.categories )
    ? row.categories[0]
    : row.categories
  const price = variant ? variant.price : row.selling_price
  const originalPriceCandidate = variant ? variant.originalPrice : row.purchase_price
  const originalPrice = null !== originalPriceCandidate && originalPriceCandidate > price
    ? originalPriceCandidate
    : null
  const discount = calculateDiscount( price, originalPrice )
  const availableVariantCount = variants.filter( ( item ) => item.isAvailable )
    .length
  const variantAttributes = variant?.attributes ?? {}

  return {
    attributes              : variantAttributes,
    availableVariantCount,
    brand                   : variantAttributes.brand ?? category?.name ?? 'Fashion',
    categoryId              : row.category_id,
    description             : row.description ?? undefined,
    discount,
    id                      : row.id,
    imageUrl                : variant ? variant.imageUrl ?? row.image_url ?? FALLBACK_PRODUCT_IMAGE : row.image_url ?? FALLBACK_PRODUCT_IMAGE,
    lastUpdated             : row.created_at,
    originalPrice,
    price,
    size                    : getFallbackSizeValue( variantAttributes ),
    title                   : row.name,
    unavailableVariantCount : Math.max( 0, variants.length - availableVariantCount ),
    variants,
  }
}

const toFashionListProduct = (
  row: ProductListRow,
  _quantityBySku: ReadonlyMap<string, number> = new Map(),
): Product => {
  const category = Array.isArray( row.categories )
    ? row.categories[0]
    : row.categories
  const price = row.selling_price
  const originalPrice = row.purchase_price > price ? row.purchase_price : null

  return {
    attributes              : {},
    availableVariantCount   : undefined,
    brand                   : category?.name ?? 'Fashion',
    categoryId              : row.category_id,
    discount                : calculateDiscount( price, originalPrice ),
    id                      : row.id,
    imageUrl                : row.image_url ?? FALLBACK_PRODUCT_IMAGE,
    lastUpdated             : row.created_at,
    originalPrice,
    price,
    size                    : 'N/A',
    title                   : row.name,
    unavailableVariantCount : undefined,
    variants                : undefined,
  }
}

const sortProductsByType = ( products: Array<Product>, type: string | null ): Array<Product> => {
  if ( 'bargain' === type ) {
    return [ ...products ]
      .sort( ( a, b ) => ( b.discount ?? 0 ) - ( a.discount ?? 0 ) )
  }

  if ( 'premium' === type ) {
    return [ ...products ]
      .sort( ( a, b ) => b.price - a.price )
  }

  return [ ...products ]
    .sort( ( a, b ) => new Date( b.lastUpdated )
      .getTime() - new Date( a.lastUpdated )
      .getTime() )
}

const buildFilterOptions = ( values: Array<string> ): Array<FilterOption> => {
  const counts = new Map<string, number>()

  for ( const value of values ) {
    const normalizedValue = value.trim()

    if ( 0 === normalizedValue.length ) {
      continue
    }

    counts.set( normalizedValue, ( counts.get( normalizedValue ) ?? 0 ) + 1 )
  }

  return [ ...counts.entries() ]
    .sort( ( a, b ) => b[1] - a[1] )
    .map( ( [ label, count ] ) => ( {
      count,
      id : `${ slugify( label ) || 'option' }-${ count }`,
      label,
    } ) )
}

const buildPriceFilters = ( products: Array<Product> ): Array<FilterOption> => {
  const buckets = [
    {
      id    : 'price-0-25',
      label : '$0 - $25',
      max   : 25,
      min   : 0,
    },
    {
      id    : 'price-25-50',
      label : '$25 - $50',
      max   : 50,
      min   : 25,
    },
    {
      id    : 'price-50-100',
      label : '$50 - $100',
      max   : 100,
      min   : 50,
    },
    {
      id    : 'price-100-plus',
      label : '$100+',
      max   : Number.POSITIVE_INFINITY,
      min   : 100,
    },
  ]

  return buckets.map( ( bucket ) => ( {
    count : products.filter(
      ( product ) => product.price >= bucket.min && product.price < bucket.max,
    ).length,
    id    : bucket.id,
    label : bucket.label,
  } ) )
}

const toFilters = ( products: Array<Product> ): Array<FilterConfig> => {
  const sizes = buildFilterOptions( products.map( ( product ) => product.size ) )
  const brands = buildFilterOptions( products.map( ( product ) => product.brand ) )
  const colors = buildFilterOptions( products.map( () => 'Default' ) )

  return [
    {
      id      : 'price',
      name    : 'searchFilters.price',
      options : buildPriceFilters( products ),
      type    : 'single',
    },
    {
      id         : 'size',
      name       : 'searchFilters.size',
      options    : sizes,
      searchable : true,
      type       : 'multi',
    },
    {
      id         : 'brand',
      name       : 'searchFilters.brand',
      options    : brands,
      searchable : true,
      type       : 'multi',
    },
    {
      id      : 'condition',
      name    : 'searchFilters.condition',
      options : [
        {
          count : Math.max( 1, Math.floor( products.length * 0.3 ) ),
          id    : 'condition-new',
          label : 'New with tags',
        },
        {
          count : Math.max( 1, Math.floor( products.length * 0.7 ) ),
          id    : 'condition-good',
          label : 'Good',
        },
      ],
      type : 'single',
    },
    {
      id      : 'color',
      name    : 'searchFilters.color',
      options : colors,
      type    : 'multi',
    },
  ]
}

const toSizes = ( products: Array<Product> ): Array<SizeOption> => {
  const options = buildFilterOptions( products.map( ( product ) => product.size ) )

  return options.map( ( option ) => ( {
    count    : option.count,
    id       : `size-${ slugify( option.label ) }`,
    imageUrl : FALLBACK_SIZE_IMAGE,
    label    : option.label.toUpperCase(),
  } ) )
}

const toCategories = (
  categoryRows: Array<CategoryRow>,
  products: Array<ProductRow>,
): Array<Category> => {
  const countByCategory = new Map<string, number>()

  for ( const product of products ) {
    countByCategory.set(
      product.category_id,
      ( countByCategory.get( product.category_id ) ?? 0 ) + 1,
    )
  }

  const categories = categoryRows.map(
    ( row ) => createCategoryNode( row, countByCategory.get( row.id ) ?? 0 ),
  )

  return withAggregatedItemCounts( splitCategories( categories ) )
}

const DEFAULT_PRODUCT_SELECT = `
  id,
  name,
  description,
  image_url,
  selling_price,
  purchase_price,
  category_id,
  created_at,
  categories ( id, name ),
  product_variants ( sku, attributes, image_url, purchase_price, selling_price )
`

const LIST_PRODUCT_SELECT = `
  id,
  name,
  image_url,
  selling_price,
  purchase_price,
  category_id,
  created_at,
  categories ( id, name )
`

export {
  DEFAULT_PRODUCT_SELECT,
  LIST_PRODUCT_SELECT,
  categoryAndDescendantIds,
  flattenCategories,
  slugify,
  sortProductsByType,
  toCategories,
  toFashionListProduct,
  toFashionProduct,
  toFilters,
  toSizes,
}
export type {
  CategoryRow,
  ProductListRow,
  ProductRow,
}
