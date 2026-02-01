import { expect, test, describe } from 'vitest'
import { cn } from './utils'

describe( 'cn', () => {
  test( 'returns empty string for no inputs', () => {
    expect( cn() )
      .toBe( '' )
  } )

  test( 'returns single class string', () => {
    expect( cn( 'foo' ) )
      .toBe( 'foo' )
  } )

  test( 'merges multiple class strings', () => {
    expect( cn( 'foo', 'bar' ) )
      .toBe( 'foo bar' )
  } )

  test( 'ignores falsy values', () => {
    expect( cn( 'foo', false, null, undefined, 'bar' ) )
      .toBe( 'foo bar' )
  } )

  test( 'handles conditional class with truthy condition', () => {
    expect( cn( 'base', true && 'active' ) )
      .toBe( 'base active' )
  } )

  test( 'handles conditional class with falsy condition', () => {
    expect( cn( 'base', false && 'active' ) )
      .toBe( 'base' )
  } )

  test( 'merges tailwind classes and keeps last conflicting', () => {
    expect( cn( 'p-4', 'p-2' ) )
      .toBe( 'p-2' )
  } )

  test( 'handles array of classes', () => {
    expect( cn( [ 'foo', 'bar' ] ) )
      .toBe( 'foo bar' )
  } )

  test( 'handles object form', () => {
    expect( cn( { foo: true, bar: false, baz: true } ) )
      .toBe( 'foo baz' )
  } )

  test( 'combines string, array, and object', () => {
    expect( cn( 'base', [ 'a', 'b' ], { active: true, disabled: false } ) )
      .toBe( 'base a b active' )
  } )
} )
