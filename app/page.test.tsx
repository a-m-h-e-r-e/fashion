import { expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import Page from './[locale]/page'
import messages from '../messages/en.json'

vi.mock( 'next-intl/server', () => ( { setRequestLocale: vi.fn() } ) )

test( 'Page', () => {
  render(
    <NextIntlClientProvider locale='en' messages={ messages }>
      <Page params={ { locale: 'en' } } />
    </NextIntlClientProvider>,
  )
  expect( screen.getByRole( 'heading', {
    level : 1,
    name  : 'Fashion',
  } ) )
    .toBeDefined()
} )
