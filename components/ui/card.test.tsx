import { expect, test, describe, afterEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './card'

afterEach( () => {
  cleanup()
} )

describe( 'Card', () => {
  test( 'renders children', () => {
    render( <Card>Card content</Card> )

    expect( screen.getByText( 'Card content' ) )
      .toBeDefined()
  } )

  test( 'applies custom className', () => {
    const { container } = render( <Card className='custom-class'>Content</Card> )

    const card = container.firstChild as HTMLElement

    expect( card.className )
      .toContain( 'custom-class' )
  } )
} )

describe( 'CardHeader', () => {
  test( 'renders children', () => {
    render( <CardHeader>Header</CardHeader> )

    expect( screen.getByText( 'Header' ) )
      .toBeDefined()
  } )
} )

describe( 'CardTitle', () => {
  test( 'renders children', () => {
    render( <CardTitle>Title</CardTitle> )

    expect( screen.getByText( 'Title' ) )
      .toBeDefined()
  } )
} )

describe( 'CardDescription', () => {
  test( 'renders children', () => {
    render( <CardDescription>Description</CardDescription> )

    expect( screen.getByText( 'Description' ) )
      .toBeDefined()
  } )
} )

describe( 'CardContent', () => {
  test( 'renders children', () => {
    render( <CardContent>Body</CardContent> )

    expect( screen.getByText( 'Body' ) )
      .toBeDefined()
  } )
} )

describe( 'CardFooter', () => {
  test( 'renders children', () => {
    render( <CardFooter>Footer</CardFooter> )

    expect( screen.getByText( 'Footer' ) )
      .toBeDefined()
  } )
} )

describe( 'Card composition', () => {
  test( 'renders full card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>Card body</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>,
    )

    expect( screen.getByText( 'Card Title' ) )
      .toBeDefined()
    expect( screen.getByText( 'Card description' ) )
      .toBeDefined()
    expect( screen.getByText( 'Card body' ) )
      .toBeDefined()
    expect( screen.getByText( 'Card footer' ) )
      .toBeDefined()
  } )
} )
