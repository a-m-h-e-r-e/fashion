import { describe, expect, it } from 'vitest'
import {
  toCategories,
  toFashionProduct,
  toFilters,
  toSizes,
  type ProductRow,
  type CategoryRow,
} from './catalog'

describe( 'catalog mappers', () => {
  const categories: Array<CategoryRow> = [
    {
      id   : 'cat-1',
      name : 'Women',
    },
    {
      id   : 'cat-2',
      name : 'Women Dresses',
    },
  ]

  const productRows: Array<ProductRow> = [
    {
      categories : {
        id   : 'cat-1',
        name : 'Women',
      },
      category_id      : 'cat-1',
      created_at       : '2026-01-01T00:00:00Z',
      id               : 'prod-1',
      image_url        : 'https://images.unsplash.com/photo-1?w=400',
      name             : 'Silk Dress',
      product_variants : [
        {
          attributes : {
            brand : 'Zara',
            size  : 'M',
          },
          image_url      : null,
          purchase_price : 100,
          selling_price  : 60,
          sku            : 'SKU-1',
        },
      ],
      purchase_price : 100,
      selling_price  : 60,
    },
  ]

  it( 'maps categories into hierarchy-compatible nodes', () => {
    const mapped = toCategories( categories, productRows )

    expect( mapped.length )
      .toBeGreaterThanOrEqual( 1 )
    expect( mapped[0] )
      .toMatchObject( {
        id   : 'cat-1',
        slug : 'women',
      } )
  } )

  it( 'maps product rows to fashion dto shape', () => {
    const mapped = toFashionProduct( productRows[0] )

    expect( mapped )
      .toMatchObject( {
        brand      : 'Zara',
        categoryId : 'cat-1',
        id         : 'prod-1',
        price      : 60,
        size       : 'M',
        title      : 'Silk Dress',
      } )
    expect( mapped.discount )
      .toBe( 40 )
  } )

  it( 'builds filters and sizes from mapped products', () => {
    const mappedProducts = productRows.map( toFashionProduct )
    const filters = toFilters( mappedProducts )
    const sizes = toSizes( mappedProducts )

    expect( filters.find( ( filterItem ) => 'size' === filterItem.id )?.options.length )
      .toBeGreaterThan( 0 )
    expect( sizes[0] )
      .toMatchObject( {
        id    : 'size-m',
        label : 'M',
      } )
  } )
} )
