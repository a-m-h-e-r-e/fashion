import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { SearchProductCard } from './search-product-card'
import messages from '../../messages/en.json'
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
  lastUpdated   : new Date()
    .toISOString(),
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

const mockProductLargePrice: Product = {
  ...mockProduct,
  id            : 'prod-4',
  originalPrice : 9876543,
  price         : 12345,
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'SearchProductCard', () => {
  test( 'renders product price', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( '$15' ) )
      .toBeDefined()
  } )

  test( 'renders original price when discounted', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( '$30' ) )
      .toBeDefined()
  } )

  test( 'renders comma-formatted prices', () => {
    renderWithIntl( <SearchProductCard product={ mockProductLargePrice } /> )

    expect( screen.getByText( '$12,345' ) )
      .toBeDefined()
    expect( screen.getByText( '$9,876,543' ) )
      .toBeDefined()
  } )

  test( 'does not render original price when null', () => {
    renderWithIntl( <SearchProductCard product={ mockProductNoDiscount } /> )

    const original = screen.queryByText( '$30' )

    expect( original )
      .toBeNull()
  } )

  test( 'renders condition "Very good" when discount > 50', () => {
    renderWithIntl( <SearchProductCard product={ mockProductHighDiscount } /> )

    expect( screen.getByText( 'Very good' ) )
      .toBeDefined()
  } )

  test( 'renders condition "Good" when discount <= 50', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Good' ) )
      .toBeDefined()
  } )

  test( 'renders title line with brand, title and size', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( /Zara, Floral Dress, size M/ ) )
      .toBeDefined()
  } )

  test( 'renders link to product page', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    const link = screen.getByRole( 'link' )

    expect( link.getAttribute( 'href' ) )
      .toBe( '/product/prod-1' )
  } )

  test( 'renders favorite button', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    const buttons = screen.getAllByRole( 'button' )

    expect( buttons )
      .toHaveLength( 1 )
  } )

  test( 'favorite button does not navigate', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    const link = screen.getByRole( 'link' )
    const button = screen.getByRole( 'button' )

    fireEvent.click( button )

    expect( link.getAttribute( 'href' ) )
      .toBe( '/product/prod-1' )
  } )

  test( 'renders brand initial in avatar', () => {
    renderWithIntl( <SearchProductCard product={ mockProduct } /> )

    expect( screen.getByText( 'Z' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <SearchProductCard className='custom-class' product={ mockProduct } />,
    )

    const link = container.querySelector( 'a' )

    expect( link?.className )
      .toContain( 'custom-class' )
  } )
} )
