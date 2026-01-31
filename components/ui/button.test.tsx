import { expect, test, describe, afterEach, vi } from 'vitest'
import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import { Button } from './button'

afterEach( () => {
  cleanup()
} )

describe( 'Button', () => {
  test( 'renders children', () => {
    render( <Button>Click me</Button> )

    expect( screen.getByRole( 'button', { name: 'Click me' } ) )
      .toBeDefined()
  } )

  test( 'calls onClick when clicked', () => {
    const handleClick = vi.fn()

    render( <Button onClick={ handleClick }>Click</Button> )

    fireEvent.click( screen.getByRole( 'button' ) )

    expect( handleClick )
      .toHaveBeenCalledTimes( 1 )
  } )

  test( 'does not call onClick when disabled', () => {
    const handleClick = vi.fn()

    render( <Button disabled onClick={ handleClick }>Click</Button> )

    fireEvent.click( screen.getByRole( 'button' ) )

    expect( handleClick )
      .not.toHaveBeenCalled()
  } )

  test( 'applies custom className', () => {
    const { container } = render( <Button className='custom-class'>Btn</Button> )

    const button = container.querySelector( 'button' )

    expect( button?.className )
      .toContain( 'custom-class' )
  } )

  test( 'applies variant classes', () => {
    const { container } = render(
      <Button variant='destructive'>Delete</Button>,
    )

    const button = container.querySelector( 'button' )

    expect( button?.className )
      .toContain( 'bg-destructive' )
  } )

  test( 'applies size classes', () => {
    const { container } = render( <Button size='lg'>Large</Button> )

    const button = container.querySelector( 'button' )

    expect( button?.className )
      .toContain( 'h-10' )
  } )

  test( 'forwards ref', () => {
    const ref = { current: null as HTMLButtonElement | null }

    render( <Button ref={ ref }>Ref</Button> )

    expect( ref.current )
      .toBeInstanceOf( HTMLButtonElement )
  } )
} )
