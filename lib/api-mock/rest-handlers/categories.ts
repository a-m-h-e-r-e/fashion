/* eslint-disable sort-keys */
import { HttpResponse, delay } from 'msw'
import { type IRestHandlers } from '../make-rest-handlers'
import type { Category, CategoriesResponse } from '@/lib/types'

/**
 * Mock category data with hierarchical structure
 */
const mockCategories: Array<Category> = [
  {
    id        : 'cat-women',
    name      : 'categories.women',
    imageUrl  : 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
    itemCount : 167556,
    slug      : 'women',
    parentId  : null,
    children  : [
      {
        id        : 'cat-women-dresses',
        name      : 'subcategories.dresses',
        imageUrl  : 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=400&fit=crop',
        itemCount : 32450,
        slug      : 'women-dresses',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-tops',
        name      : 'subcategories.tops',
        imageUrl  : 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=400&fit=crop',
        itemCount : 28930,
        slug      : 'women-tops',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-jeans',
        name      : 'subcategories.jeans',
        imageUrl  : 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=400&fit=crop',
        itemCount : 18720,
        slug      : 'women-jeans',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-jumpers',
        name      : 'subcategories.jumpers',
        imageUrl  : 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=400&fit=crop',
        itemCount : 15840,
        slug      : 'women-jumpers',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-sweatshirts',
        name      : 'subcategories.sweatshirts',
        imageUrl  : 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
        itemCount : 12340,
        slug      : 'women-sweatshirts',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-coats',
        name      : 'subcategories.coats',
        imageUrl  : 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=400&h=400&fit=crop',
        itemCount : 9870,
        slug      : 'women-coats',
        parentId  : 'cat-women',
      },
      {
        id        : 'cat-women-shoes',
        name      : 'subcategories.shoes',
        imageUrl  : 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=400&h=400&fit=crop',
        itemCount : 21560,
        slug      : 'women-shoes',
        parentId  : 'cat-women',
      },
    ],
  },
  {
    id        : 'cat-men',
    name      : 'categories.men',
    imageUrl  : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    itemCount : 6763,
    slug      : 'men',
    parentId  : null,
    children  : [
      {
        id        : 'cat-men-shirts',
        name      : 'subcategories.shirts',
        imageUrl  : 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&h=400&fit=crop',
        itemCount : 1520,
        slug      : 'men-shirts',
        parentId  : 'cat-men',
      },
      {
        id        : 'cat-men-trousers',
        name      : 'subcategories.trousers',
        imageUrl  : 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop',
        itemCount : 1230,
        slug      : 'men-trousers',
        parentId  : 'cat-men',
      },
      {
        id        : 'cat-men-jeans',
        name      : 'subcategories.jeans',
        imageUrl  : 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
        itemCount : 980,
        slug      : 'men-jeans',
        parentId  : 'cat-men',
      },
      {
        id        : 'cat-men-suits',
        name      : 'subcategories.suits',
        imageUrl  : 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
        itemCount : 450,
        slug      : 'men-suits',
        parentId  : 'cat-men',
      },
      {
        id        : 'cat-men-shoes',
        name      : 'subcategories.shoes',
        imageUrl  : 'https://images.unsplash.com/photo-1449505278894-297fdb3edbc1?w=400&h=400&fit=crop',
        itemCount : 890,
        slug      : 'men-shoes',
        parentId  : 'cat-men',
      },
    ],
  },
  {
    id        : 'cat-children',
    name      : 'categories.children',
    imageUrl  : 'https://images.unsplash.com/photo-1566454419290-57a0589c9b17?w=400&h=400&fit=crop',
    itemCount : 975,
    slug      : 'children',
    parentId  : null,
    children  : [
      {
        id        : 'cat-children-girls',
        name      : 'subcategories.girls',
        imageUrl  : 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=400&h=400&fit=crop',
        itemCount : 520,
        slug      : 'children-girls',
        parentId  : 'cat-children',
      },
      {
        id        : 'cat-children-boys',
        name      : 'subcategories.boys',
        imageUrl  : 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=400&h=400&fit=crop',
        itemCount : 455,
        slug      : 'children-boys',
        parentId  : 'cat-children',
      },
    ],
  },
  {
    id        : 'cat-accessories',
    name      : 'categories.accessories',
    imageUrl  : 'https://images.unsplash.com/photo-1523779105320-d1cd346ff52b?w=400&h=400&fit=crop',
    itemCount : 3240,
    slug      : 'accessories',
    parentId  : null,
    children  : [
      {
        id        : 'cat-accessories-bags',
        name      : 'subcategories.bags',
        imageUrl  : 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop',
        itemCount : 1450,
        slug      : 'accessories-bags',
        parentId  : 'cat-accessories',
      },
      {
        id        : 'cat-accessories-jewelry',
        name      : 'subcategories.jewelry',
        imageUrl  : 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop',
        itemCount : 980,
        slug      : 'accessories-jewelry',
        parentId  : 'cat-accessories',
      },
      {
        id        : 'cat-accessories-watches',
        name      : 'subcategories.watches',
        imageUrl  : 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
        itemCount : 810,
        slug      : 'accessories-watches',
        parentId  : 'cat-accessories',
      },
    ],
  },
  {
    id        : 'cat-sports',
    name      : 'categories.sports',
    imageUrl  : 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&h=400&fit=crop',
    itemCount : 2150,
    slug      : 'sports',
    parentId  : null,
    children  : [
      {
        id        : 'cat-sports-activewear',
        name      : 'subcategories.activewear',
        imageUrl  : 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=400&fit=crop',
        itemCount : 1120,
        slug      : 'sports-activewear',
        parentId  : 'cat-sports',
      },
      {
        id        : 'cat-sports-sneakers',
        name      : 'subcategories.sneakers',
        imageUrl  : 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
        itemCount : 1030,
        slug      : 'sports-sneakers',
        parentId  : 'cat-sports',
      },
    ],
  },
]

const categoriesRestHandlers: Array<IRestHandlers> = [
  {
    endpoint     : '*/api/categories',
    mockResponse : async () => {
      await delay( 150 )

      const response: CategoriesResponse = { categories: mockCategories }

      return HttpResponse.json( response )
    },
  },
  {
    endpoint     : '*/api/categories/:slug',
    mockResponse : async ( { params } ) => {
      await delay( 100 )

      const slug = params.slug as string

      // Find category by slug (could be top-level or nested)
      const findCategory = ( categories: Array<Category>, targetSlug: string ): Category | null => {
        for ( const cat of categories ) {
          if ( cat.slug === targetSlug ) {
            return cat
          }

          if ( cat.children ) {
            const found = findCategory( cat.children, targetSlug )

            if ( found ) {
              return found
            }
          }
        }

        return null
      }

      const category = findCategory( mockCategories, slug )

      if ( !category ) {
        return HttpResponse.json( { error: 'Category not found' }, { status: 404 } )
      }

      return HttpResponse.json( { category } )
    },
  },
]

export default categoriesRestHandlers
