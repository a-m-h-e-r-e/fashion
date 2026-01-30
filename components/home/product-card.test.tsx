import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ProductCard } from './product-card'
import messages from '../../messages/en.json'
import type { Product } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockProduct: Product = {
  brand       : 'Zara',
  categoryId  : 'cat-women-dresses',
  discount    : 75,
  id          : 'prod-1',
  imageUrl    : 'https://example.com/image.jpg',
  lastUpdated : new Date()
    .toISOString(),
  originalPrice : 8,
  price         : 2,
  size          : 'S',
  title         : 'Floral Dress',
}

const mockProductNoDiscount: Product = {
  ...mockProduct,
  discount      : null,
  id            : 'prod-2',
  originalPrice : null,
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'ProductCard', () => {
  test( 'renders product price', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    expect( screen.getByText( '$2' ) )
      .toBeDefined()
  } )

  test( 'renders original price when discounted', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    const originalPrice = screen.getByText( '$8' )

    expect( originalPrice )
      .toBeDefined()
    expect( originalPrice.className )
      .toContain( 'line-through' )
  } )

  test( 'renders discount badge', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    const badge = screen.getByText( '-75%' )

    expect( badge )
      .toBeDefined()
    expect( badge.className )
      .toContain( 'bg-' )
  } )

  test( 'does not render discount badge when no discount', () => {
    renderWithIntl( <ProductCard product={ mockProductNoDiscount } /> )

    const badges = screen.queryAllByText( /-\d+%/ )

    expect( badges.length )
      .toBe( 0 )
  } )

  test( 'renders product brand', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Zara' ) )
      .toBeDefined()
  } )

  test( 'renders product title', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Floral Dress' ) )
      .toBeDefined()
  } )

  test( 'renders product size', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    expect( screen.getByText( /Size S/i ) )
      .toBeDefined()
  } )

  test( 'renders link to product page', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    const link = screen.getByRole( 'link' )

    expect( link )
      .toBeDefined()
    expect( link.getAttribute( 'href' ) )
      .toBe( '/product/prod-1' )
  } )

  test( 'renders product image with alt text', () => {
    renderWithIntl( <ProductCard product={ mockProduct } /> )

    const image = screen.getByAltText( 'Floral Dress' )

    expect( image )
      .toBeDefined()
    expect( image.tagName )
      .toBe( 'IMG' )
  } )
} )
