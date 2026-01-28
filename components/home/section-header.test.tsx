import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { SectionHeader } from './section-header'
import messages from '../../messages/en.json'

afterEach( () => {
  cleanup()
} )

const renderWithIntl = ( component: React.ReactNode ) => render(
  <NextIntlClientProvider locale='en' messages={ messages }>
    {component}
  </NextIntlClientProvider>,
)

describe( 'SectionHeader', () => {
  test( 'renders title from translation key', () => {
    renderWithIntl( <SectionHeader titleKey='categories.title' /> )

    expect( screen.getByText( 'Categories' ) )
      .toBeDefined()
  } )

  test( 'renders See all link by default', () => {
    renderWithIntl( <SectionHeader titleKey='categories.title' /> )

    const seeAllLink = screen.getByText( 'See all' )

    expect( seeAllLink )
      .toBeDefined()
  } )

  test( 'hides See all link when hasSeeAllLink is false', () => {
    renderWithIntl( <SectionHeader hasSeeAllLink={ false } titleKey='categories.title' /> )

    const seeAllLink = screen.queryByText( 'See all' )

    expect( seeAllLink )
      .toBeNull()
  } )

  test( 'uses provided href for See all link', () => {
    renderWithIntl( <SectionHeader href='/custom-path' titleKey='categories.title' /> )

    const link = screen.getByText( 'See all' )
      .closest( 'a' )

    expect( link )
      .toBeDefined()
    expect( link?.getAttribute( 'href' ) )
      .toBe( '/custom-path' )
  } )

  test( 'applies custom className to wrapper', () => {
    const { container } = renderWithIntl(
      <SectionHeader className='custom-class' titleKey='categories.title' />,
    )

    const wrapper = container.firstChild as HTMLElement

    expect( wrapper.className )
      .toContain( 'custom-class' )
  } )

  test( 'renders title as h2 element', () => {
    renderWithIntl( <SectionHeader titleKey='categories.title' /> )

    const heading = screen.getByRole( 'heading', { level: 2 } )

    expect( heading )
      .toBeDefined()
    expect( heading.textContent )
      .toBe( 'Categories' )
  } )
} )
