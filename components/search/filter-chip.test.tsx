import { expect, test, describe, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { FilterChip, FilterBar } from './filter-chip'
import messages from '../../messages/en.json'
import type { FilterConfig } from '@/lib/types'

afterEach( () => {
  cleanup()
} )

const mockFilter: FilterConfig = {
  id      : 'size',
  name    : 'searchFilters.size',
  type    : 'multi',
  options : [
    { id: 's', label: 'S', count: 10 },
    { id: 'm', label: 'M', count: 20 },
  ],
}

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'FilterChip', () => {
  test( 'renders filter name when no selection', () => {
    renderWithIntl(
      <FilterChip
        filter={ mockFilter }
        onClick={ vi.fn() }
        selectedValues={ [] }
      />,
    )

    expect( screen.getByText( 'Size' ) )
      .toBeDefined()
  } )

  test( 'renders selected option label when single selection', () => {
    renderWithIntl(
      <FilterChip
        filter={ mockFilter }
        onClick={ vi.fn() }
        selectedValues={ [ 's' ] }
      />,
    )

    expect( screen.getByText( 'S' ) )
      .toBeDefined()
  } )

  test( 'renders count when multiple selected', () => {
    renderWithIntl(
      <FilterChip
        filter={ mockFilter }
        onClick={ vi.fn() }
        selectedValues={ [ 's', 'm' ] }
      />,
    )

    expect( screen.getByText( /Size \(\d+\)/ ) )
      .toBeDefined()
  } )

  test( 'calls onClick when button clicked', () => {
    const onClick = vi.fn()

    renderWithIntl(
      <FilterChip
        filter={ mockFilter }
        onClick={ onClick }
        selectedValues={ [] }
      />,
    )

    fireEvent.click( screen.getByRole( 'button', { name: /Size/ } ) )

    expect( onClick )
      .toHaveBeenCalledTimes( 1 )
  } )

  test( 'calls onClear when clear button clicked', () => {
    const onClear = vi.fn()

    renderWithIntl(
      <FilterChip
        filter={ mockFilter }
        onClear={ onClear }
        onClick={ vi.fn() }
        selectedValues={ [ 's' ] }
      />,
    )

    const buttons = screen.getAllByRole( 'button' )

    expect( buttons ).toHaveLength( 2 )

    fireEvent.click( buttons[1] )

    expect( onClear )
      .toHaveBeenCalledTimes( 1 )
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <FilterChip
        className='custom-class'
        filter={ mockFilter }
        onClick={ vi.fn() }
        selectedValues={ [] }
      />,
    )

    const wrapper = container.firstChild as HTMLElement

    expect( wrapper.className )
      .toContain( 'custom-class' )
  } )
} )

describe( 'FilterBar', () => {
  test( 'renders all filter chips', () => {
    const filters: Array<FilterConfig> = [
      mockFilter,
      { ...mockFilter, id: 'price', name: 'searchFilters.price', options: [] },
    ]

    renderWithIntl(
      <FilterBar
        filters={ filters }
        onClearFilter={ vi.fn() }
        onFilterClick={ vi.fn() }
        selectedFilters={ {} }
      />,
    )

    expect( screen.getByText( 'Size' ) )
      .toBeDefined()
    expect( screen.getByText( 'Price' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl(
      <FilterBar
        className='custom-bar'
        filters={ [ mockFilter ] }
        onClearFilter={ vi.fn() }
        onFilterClick={ vi.fn() }
        selectedFilters={ {} }
      />,
    )

    const wrapper = container.firstChild as HTMLElement

    expect( wrapper.className )
      .toContain( 'custom-bar' )
  } )
} )
