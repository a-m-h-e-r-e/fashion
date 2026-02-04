'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'

const THEME_STORAGE_KEY = 'theme'

export type Theme = 'light' | 'dark'

type ThemeContextValue = {
  theme   : Theme
  setTheme: ( theme: Theme ) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>( null )

function getStoredTheme(): Theme {
  if ( typeof window === 'undefined' ) return 'dark'
  const stored = localStorage.getItem( THEME_STORAGE_KEY )
  if ( stored === 'light' || stored === 'dark' ) return stored
  return 'dark'
}

function applyTheme( theme: Theme ) {
  const root = document.documentElement
  if ( theme === 'dark' ) {
    root.classList.add( 'dark' )
  } else {
    root.classList.remove( 'dark' )
  }
}

export function ThemeProvider( { children }: { children: React.ReactNode } ) {
  const [ theme, setThemeState ] = useState<Theme>( 'dark' )
  const [ mounted, setMounted ] = useState( false )

  useEffect( () => {
    setThemeState( getStoredTheme() )
    setMounted( true )
  }, [] )

  useEffect( () => {
    if ( !mounted ) return
    applyTheme( theme )
    localStorage.setItem( THEME_STORAGE_KEY, theme )
  }, [ theme, mounted ] )

  const setTheme = useCallback( ( value: Theme ) => {
    setThemeState( value )
  }, [] )

  const toggleTheme = useCallback( () => {
    setThemeState( ( prev ) => ( prev === 'dark' ? 'light' : 'dark' ) )
  }, [] )

  const value = useMemo(
    () => ( { theme, setTheme, toggleTheme } ),
    [ theme, setTheme, toggleTheme ],
  )

  return (
    <ThemeContext.Provider value={ value }>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext( ThemeContext )
  if ( !ctx ) {
    throw new Error( 'useTheme must be used within ThemeProvider' )
  }
  return ctx
}
