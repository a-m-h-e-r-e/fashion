import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { SubcategoryCard } from './subcategory-card'
import messages from '../../messages/en.json'
import type { Category } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockSubcategory: Category = {
  id        : 'cat-dresses',
  imageUrl  : 'https://example.com/dresses.jpg',
  itemCount : 1250,
  name      : 'subcategories.dresses',
  parentId  : 'cat-women',
  slug      : 'women/dresses',
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'SubcategoryCard', () => {
  test( 'renders subcategory name from translation', () => {
    renderWithIntl( <SubcategoryCard subcategory={ mockSubcategory } /> )

    expect( screen.getByText( 'Dresses' ) )
      .toBeDefined()
  } )

  test( 'renders item count', () => {
    renderWithIntl( <SubcategoryCard subcategory={ mockSubcategory } /> )

    expect( screen.getByText( '1250+ items' ) )
      .toBeDefined()
  } )

  test( 'renders link to subcategory page', () => {
    renderWithIntl( <SubcategoryCard subcategory={ mockSubcategory } /> )

    const link = screen.getByRole( 'link' )

    expect( link )
      .toBeDefined()
    expect( link.getAttribute( 'href' ) )
      .toBe( '/women/dresses' )
  } )

  test( 'renders image with alt from translation', () => {
    renderWithIntl( <SubcategoryCard subcategory={ mockSubcategory } /> )

    expect( screen.getByAltText( 'Dresses' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <SubcategoryCard className='custom-class' subcategory={ mockSubcategory } />,
    )

    const link = container.querySelector( 'a' )

    expect( link?.className )
      .toContain( 'custom-class' )
  } )
} )
