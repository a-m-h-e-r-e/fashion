import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { CategoryCard } from './category-card'
import messages from '../../messages/en.json'
import type { Category } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockCategory: Category = {
  id        : 'cat-women',
  imageUrl  : 'https://example.com/image.jpg',
  itemCount : 167556,
  name      : 'categories.women',
  parentId  : null,
  slug      : 'women',
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'CategoryCard', () => {
  test( 'renders category name from translation', () => {
    renderWithIntl( <CategoryCard category={ mockCategory } /> )

    expect( screen.getByText( 'Women' ) )
      .toBeDefined()
  } )

  test( 'renders item count', () => {
    renderWithIntl( <CategoryCard category={ mockCategory } /> )

    // Should display formatted count (168k+ due to rounding)
    expect( screen.getByText( /168k\+ items/i ) )
      .toBeDefined()
  } )

  test( 'renders link to category page', () => {
    renderWithIntl( <CategoryCard category={ mockCategory } /> )

    const link = screen.getByRole( 'link' )

    expect( link )
      .toBeDefined()
    expect( link.getAttribute( 'href' ) )
      .toBe( '/en/women' )
  } )

  test( 'renders category image with alt text', () => {
    renderWithIntl( <CategoryCard category={ mockCategory } /> )

    const image = screen.getByAltText( 'Women' )

    expect( image )
      .toBeDefined()
    expect( image.tagName )
      .toBe( 'IMG' )
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <CategoryCard category={ mockCategory } className='custom-class' />,
    )

    const link = container.querySelector( 'a' )

    expect( link?.className )
      .toContain( 'custom-class' )
  } )
} )
