/* eslint-disable sort-keys */
import { HttpResponse, delay } from 'msw'
import { type IRestHandlers } from '../make-rest-handlers'
import type { Product, ProductsResponse } from '@/lib/types'

/**
 * Mock product data - bargain items (high discounts)
 */
const mockBargainProducts: Array<Product> = [
  {
    id            : 'prod-1',
    title         : 'Women\'s Floral Dress',
    price         : 2,
    originalPrice : 8,
    imageUrl      : 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop',
    discount      : 75,
    size          : 'S',
    brand         : 'Zara',
    categoryId    : 'cat-women-dresses',
    lastUpdated   : '2026-01-20T10:00:00Z',
  },
  {
    id            : 'prod-2',
    title         : 'Disney Sweatshirt',
    price         : 2,
    originalPrice : 9,
    imageUrl      : 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=400&h=500&fit=crop',
    discount      : 78,
    size          : 'S',
    brand         : 'Disney',
    categoryId    : 'cat-women-sweatshirts',
    lastUpdated   : '2026-01-19T14:30:00Z',
  },
  {
    id            : 'prod-3',
    title         : 'Classic Blue Blouse',
    price         : 2,
    originalPrice : 7,
    imageUrl      : 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop',
    discount      : 71,
    size          : 'S',
    brand         : 'Yessica',
    categoryId    : 'cat-women-tops',
    lastUpdated   : '2026-01-18T09:15:00Z',
  },
  {
    id            : 'prod-4',
    title         : 'Vintage Print Dress',
    price         : 3,
    originalPrice : 12,
    imageUrl      : 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=500&fit=crop',
    discount      : 75,
    size          : 'M',
    brand         : 'H&M',
    categoryId    : 'cat-women-dresses',
    lastUpdated   : '2026-01-17T16:45:00Z',
  },
  {
    id            : 'prod-5',
    title         : 'Casual Striped Top',
    price         : 2,
    originalPrice : 6,
    imageUrl      : 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=500&fit=crop',
    discount      : 67,
    size          : 'L',
    brand         : 'Primark',
    categoryId    : 'cat-women-tops',
    lastUpdated   : '2026-01-16T11:20:00Z',
  },
  {
    id            : 'prod-6',
    title         : 'Denim Mini Skirt',
    price         : 4,
    originalPrice : 15,
    imageUrl      : 'https://images.unsplash.com/photo-1583496661160-fb5886a0uj9d?w=400&h=500&fit=crop',
    discount      : 73,
    size          : 'S',
    brand         : 'Levi\'s',
    categoryId    : 'cat-women-jeans',
    lastUpdated   : '2026-01-15T08:30:00Z',
  },
]

/**
 * Mock product data - premium items (lower or no discounts)
 */
const mockPremiumProducts: Array<Product> = [
  {
    id            : 'prod-p1',
    title         : 'Esprit Silk Blouse',
    price         : 38,
    originalPrice : null,
    imageUrl      : 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=400&h=500&fit=crop',
    discount      : null,
    size          : 'S',
    brand         : 'Esprit',
    categoryId    : 'cat-women-tops',
    lastUpdated   : '2026-01-22T10:00:00Z',
  },
  {
    id            : 'prod-p2',
    title         : 'Zara Linen Shirt',
    price         : 35,
    originalPrice : null,
    imageUrl      : 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop',
    discount      : null,
    size          : 'S',
    brand         : 'Zara',
    categoryId    : 'cat-women-tops',
    lastUpdated   : '2026-01-21T14:30:00Z',
  },
  {
    id            : 'prod-p3',
    title         : 'Tommy Hilfiger Shirt',
    price         : 46,
    originalPrice : 51,
    imageUrl      : 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=500&fit=crop',
    discount      : 10,
    size          : 'M',
    brand         : 'Tommy Hilfiger',
    categoryId    : 'cat-women-tops',
    lastUpdated   : '2026-01-20T09:15:00Z',
  },
  {
    id            : 'prod-p4',
    title         : 'Ralph Lauren Polo',
    price         : 55,
    originalPrice : 65,
    imageUrl      : 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=500&fit=crop',
    discount      : 15,
    size          : 'L',
    brand         : 'Ralph Lauren',
    categoryId    : 'cat-men-shirts',
    lastUpdated   : '2026-01-19T16:45:00Z',
  },
  {
    id            : 'prod-p5',
    title         : 'Calvin Klein Jeans',
    price         : 42,
    originalPrice : null,
    imageUrl      : 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop',
    discount      : null,
    size          : 'M',
    brand         : 'Calvin Klein',
    categoryId    : 'cat-women-jeans',
    lastUpdated   : '2026-01-18T11:20:00Z',
  },
  {
    id            : 'prod-p6',
    title         : 'Michael Kors Blazer',
    price         : 89,
    originalPrice : 120,
    imageUrl      : 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop',
    discount      : 26,
    size          : 'S',
    brand         : 'Michael Kors',
    categoryId    : 'cat-women-coats',
    lastUpdated   : '2026-01-17T08:30:00Z',
  },
]

const productsRestHandlers: Array<IRestHandlers> = [
  {
    endpoint     : '*/api/products',
    mockResponse : async ( { request } ) => {
      await delay( 200 )

      const url = new URL( request.url )
      const type = url.searchParams.get( 'type' )
      const category = url.searchParams.get( 'category' )
      const limit = parseInt( url.searchParams.get( 'limit' ) ?? '10', 10 )

      let products: Array<Product>

      if ( 'premium' === type ) {
        products = [ ...mockPremiumProducts ]
      } else if ( 'bargain' === type ) {
        products = [ ...mockBargainProducts ]
      } else {
        products = [ ...mockBargainProducts, ...mockPremiumProducts ]
      }

      // Filter by category if specified
      if ( category ) {
        // For parent categories (e.g., "men"), filter by category prefix
        // For child categories (e.g., "men-shirts"), filter exact match
        products = products.filter( ( p ) => {
          if ( p.categoryId.startsWith( `cat-${ category }` ) ) {
            return true
          }

          // Also check if the category matches a parent
          const categoryPrefix = category.split( '-' )[0]

          return p.categoryId.includes( categoryPrefix )
        } )
      }

      const total = products.length
      products = products.slice( 0, limit )

      const response: ProductsResponse = {
        products,
        total,
      }

      return HttpResponse.json( response )
    },
  },
  {
    endpoint     : '*/api/products/:id',
    mockResponse : async ( { params } ) => {
      await delay( 100 )

      const id = params.id as string
      const allProducts = [ ...mockBargainProducts, ...mockPremiumProducts ]
      const product = allProducts.find( ( prod ) => prod.id === id )

      if ( !product ) {
        return HttpResponse.json( { error: 'Product not found' }, { status: 404 } )
      }

      return HttpResponse.json( { product } )
    },
  },
]

export default productsRestHandlers
