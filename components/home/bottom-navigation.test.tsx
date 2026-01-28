import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { BottomNavigation } from './bottom-navigation'
import messages from '../../messages/en.json'

afterEach( () => {
  cleanup()
} )

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'BottomNavigation', () => {
  test( 'renders all navigation items', () => {
    renderWithIntl( <BottomNavigation /> )

    expect( screen.getByText( 'Home' ) )
      .toBeDefined()
    expect( screen.getByText( 'Favorites' ) )
      .toBeDefined()
    expect( screen.getByText( 'Chats' ) )
      .toBeDefined()
    expect( screen.getByText( 'Profile' ) )
      .toBeDefined()
  } )

  test( 'renders correct number of links', () => {
    renderWithIntl( <BottomNavigation /> )

    const links = screen.getAllByRole( 'link' )

    expect( links.length )
      .toBe( 4 )
  } )

  test( 'renders home link with correct href', () => {
    renderWithIntl( <BottomNavigation /> )

    const homeLink = screen.getByText( 'Home' )
      .closest( 'a' )

    expect( homeLink?.getAttribute( 'href' ) )
      .toBe( '/' )
  } )

  test( 'highlights favorites when set as active', () => {
    renderWithIntl( <BottomNavigation activeItem='favorites' /> )

    const favoritesLink = screen.getByText( 'Favorites' )
      .closest( 'a' )

    // Check for the gold color class
    expect( favoritesLink?.className )
      .toContain( 'text-[hsl(var(--gold))]' )
  } )

  test( 'highlights home by default', () => {
    renderWithIntl( <BottomNavigation /> )

    const homeLink = screen.getByText( 'Home' )
      .closest( 'a' )

    // Check for the gold color class
    expect( homeLink?.className )
      .toContain( 'text-[hsl(var(--gold))]' )
  } )
} )
