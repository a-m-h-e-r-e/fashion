import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { QuickFilterChip, QuickFiltersRow } from './quick-filter-chip'
import messages from '../../messages/en.json'
import type { QuickFilter } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockFilter: QuickFilter = {
  id       : 'sale',
  type     : 'sale',
  labelKey  : 'filters.sale',
  imageUrl  : 'https://example.com/sale.jpg',
  badge    : '-60%',
}

const mockFilterNoBadge: QuickFilter = {
  ...mockFilter,
  id    : 'budget',
  type  : 'budget',
  badge : null,
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'QuickFilterChip', () => {
  test( 'renders label from translation', () => {
    renderWithIntl( <QuickFilterChip filter={ mockFilter } /> )

    expect( screen.getByText( 'Sale' ) )
      .toBeDefined()
  } )

  test( 'renders link to filter page', () => {
    renderWithIntl( <QuickFilterChip filter={ mockFilter } /> )

    const link = screen.getByRole( 'link' )

    expect( link )
      .toBeDefined()
    expect( link.getAttribute( 'href' ) )
      .toBe( '/filter/sale' )
  } )

  test( 'renders badge when present', () => {
    renderWithIntl( <QuickFilterChip filter={ mockFilter } /> )

    expect( screen.getByText( '-60%' ) )
      .toBeDefined()
  } )

  test( 'does not render badge when null', () => {
    renderWithIntl( <QuickFilterChip filter={ mockFilterNoBadge } /> )

    const badge = screen.queryByText( '-60%' )

    expect( badge )
      .toBeNull()
  } )

  test( 'renders image with alt from translation', () => {
    renderWithIntl( <QuickFilterChip filter={ mockFilter } /> )

    expect( screen.getByAltText( 'Sale' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <QuickFilterChip className='custom-class' filter={ mockFilter } />,
    )

    const link = container.querySelector( 'a' )

    expect( link?.className )
      .toContain( 'custom-class' )
  } )
} )

describe( 'QuickFiltersRow', () => {
  test( 'renders multiple filter chips', () => {
    const filters: Array<QuickFilter> = [
      mockFilter,
      { ...mockFilterNoBadge, id: 'condition', labelKey: 'filters.perfectCondition' },
    ]

    renderWithIntl( <QuickFiltersRow filters={ filters } /> )

    expect( screen.getByText( 'Sale' ) )
      .toBeDefined()
    expect( screen.getByText( 'In perfect condition' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <QuickFiltersRow className='custom-row' filters={ [ mockFilter ] } />,
    )

    const wrapper = container.firstChild as HTMLElement

    expect( wrapper.className )
      .toContain( 'custom-row' )
  } )
} )
