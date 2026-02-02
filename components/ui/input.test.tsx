import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Input } from './input'

afterEach( () => {
  cleanup()
} )

describe( 'Input', () => {
  test( 'renders with placeholder', () => {
    render( <Input placeholder='Enter text' /> )

    const input = screen.getByPlaceholderText( 'Enter text' )

    expect( input )
      .toBeDefined()
    expect( input.tagName )
      .toBe( 'INPUT' )
  } )

  test( 'accepts and displays value', () => {
    render( <Input placeholder='Search' /> )

    const input = screen.getByPlaceholderText( 'Search' )

    fireEvent.change( input, { target: { value: 'hello' } } )

    expect( ( input as HTMLInputElement ).value )
      .toBe( 'hello' )
  } )

  test( 'applies custom className', () => {
    const { container } = render(
      <Input className='custom-class' placeholder='Test' />,
    )

    const input = container.querySelector( 'input' )

    expect( input?.className )
      .toContain( 'custom-class' )
  } )

  test( 'can be disabled', () => {
    render( <Input disabled placeholder='Disabled' /> )

    const input = screen.getByPlaceholderText( 'Disabled' ) as HTMLInputElement

    expect( input.disabled )
      .toBe( true )
  } )

  test( 'forwards ref', () => {
    const ref = { current: null as HTMLInputElement | null }

    render( <Input ref={ ref } placeholder='Ref' /> )

    expect( ref.current )
      .toBeInstanceOf( HTMLInputElement )
  } )
} )
