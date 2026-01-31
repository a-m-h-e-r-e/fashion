import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { SearchProductCard } from './search-product-card'
import type { Product } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockProduct: Product = {
  id            : 'prod-1',
  title         : 'Floral Dress',
  brand         : 'Zara',
  size          : 'M',
  price         : 15,
  originalPrice : 30,
  discount      : 50,
  imageUrl      : 'https://example.com/dress.jpg',
  categoryId    : 'cat-dresses',
  lastUpdated   : new Date().toISOString(),
}

const mockProductNoDiscount: Product = {
  ...mockProduct,
  id            : 'prod-2',
  originalPrice : null,
  discount      : null,
}

const mockProductHighDiscount: Product = {
  ...mockProduct,
  id       : 'prod-3',
  discount : 75,
}

describe( 'SearchProductCard', () => {
  test( 'renders product price', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( '15 zł' ) )
      .toBeDefined()
  } )

  test( 'renders original price when discounted', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( '30 zł' ) )
      .toBeDefined()
  } )

  test( 'does not render original price when null', () => {
    render( <SearchProductCard product={ mockProductNoDiscount } /> )

    const original = screen.queryByText( '30 zł' )

    expect( original )
      .toBeNull()
  } )

  test( 'renders condition "Very good" when discount > 50', () => {
    render( <SearchProductCard product={ mockProductHighDiscount } /> )

    expect( screen.getByText( 'Very good' ) )
      .toBeDefined()
  } )

  test( 'renders condition "Good" when discount <= 50', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Good' ) )
      .toBeDefined()
  } )

  test( 'renders title line with brand, title and size', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( /Zara, Floral Dress, size M/ ) )
      .toBeDefined()
  } )

  test( 'renders link to product page', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    const link = screen.getByRole( 'link' )

    expect( link.getAttribute( 'href' ) )
      .toBe( '/product/prod-1' )
  } )

  test( 'renders favorite button', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    const buttons = screen.getAllByRole( 'button' )

    expect( buttons ).toHaveLength( 1 )
  } )

  test( 'favorite button does not navigate', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    const link = screen.getByRole( 'link' )
    const button = screen.getByRole( 'button' )

    fireEvent.click( button )

    expect( link.getAttribute( 'href' ) )
      .toBe( '/product/prod-1' )
  } )

  test( 'renders brand initial in avatar', () => {
    render( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Z' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = render(
      <SearchProductCard className='custom-class' product={ mockProduct } />,
    )

    const link = container.querySelector( 'a' )

    expect( link?.className )
      .toContain( 'custom-class' )
  } )
} )
