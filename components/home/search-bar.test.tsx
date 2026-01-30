import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { SearchBar } from './search-bar'
import messages from '../../messages/en.json'

afterEach( () => {
  cleanup()
} )

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'SearchBar', () => {
  test( 'renders search input with placeholder', () => {
    renderWithIntl( <SearchBar /> )

    const input = screen.getByPlaceholderText( messages.search.placeholder )

    expect( input )
      .toBeDefined()
    expect( input.tagName )
      .toBe( 'INPUT' )
  } )

  test( 'renders filter button with icon', () => {
    renderWithIntl( <SearchBar /> )

    const filterButton = screen.getByRole( 'button' )

    expect( filterButton )
      .toBeDefined()
    expect( filterButton.tagName )
      .toBe( 'BUTTON' )
  } )

  test( 'applies custom className', () => {
    const { container } = renderWithIntl( <SearchBar className='custom-class' /> )

    const wrapper = container.firstChild as HTMLElement

    expect( wrapper.className )
      .toContain( 'custom-class' )
  } )
} )
