'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect, useCallback } from 'react'
import { X, Search, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { FilterConfig, FilterOption } from '@/lib/types'

interface FilterBottomSheetProps {
  isOpen         : boolean
  onClose        : () => void
  filter         : FilterConfig | null
  selectedValues : Array<string>
  onApply        : ( filterId: string, values: Array<string> ) => void
  totalResults   : number
}

export function FilterBottomSheet( {
  isOpen,
  onClose,
  filter,
  selectedValues,
  onApply,
  totalResults,
}: FilterBottomSheetProps ) {
  const t = useTranslations()
  const [ localSelection, setLocalSelection ] = useState<Array<string>>( [] )
  const [ searchQuery, setSearchQuery ] = useState( '' )

  // Sync local selection with props when opening
  useEffect( () => {
    if ( isOpen ) {
      setLocalSelection( selectedValues )
      setSearchQuery( '' )
    }
  }, [ isOpen, selectedValues ] )

  // Handle body scroll lock
  useEffect( () => {
    if ( isOpen ) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [ isOpen ] )

  const handleToggle = useCallback( ( optionId: string ) => {
    if ( !filter ) {
      return
    }

    if ( 'single' === filter.type ) {
      setLocalSelection( [ optionId ] )
    } else {
      setLocalSelection( ( prev ) => (prev.includes( optionId )
          ? prev.filter( ( id ) => id !== optionId )
          : [ ...prev, optionId ]), )
    }
  }, [ filter ] )

  const handleClear = useCallback( () => {
    setLocalSelection( [] )
  }, [] )

  const handleApply = useCallback( () => {
    if ( filter ) {
      onApply( filter.id, localSelection )
    }

    onClose()
  }, [ filter, localSelection, onApply, onClose ] )

  // Filter options by search query
  const filteredOptions = filter?.options.filter( ( opt ) => opt.label.toLowerCase()
    .includes( searchQuery.toLowerCase() ) ) ?? []

  // Calculate total count for selected items
  const selectedCount = localSelection.reduce( ( sum, id ) => {
    const opt = filter?.options.find( ( o ) => o.id === id )

    return sum + ( opt?.count ?? 0 )
  }, 0 )

  if ( !filter ) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className={
          cn(
            'fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity lg:hidden',
            isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          )
        }
        onClick={ onClose }
      />

      {/* Mobile Bottom Sheet */}
      <div
        className={
          cn(
            'fixed inset-x-0 bottom-0 z-[60] flex h-[85vh] flex-col rounded-t-3xl bg-[hsl(var(--card))] transition-transform duration-300 lg:hidden',
            isOpen ? 'translate-y-0' : 'translate-y-full',
          )
        }
      >
        {/* Handle */}
        <div className='flex justify-center py-3'>
          <div className='h-1 w-10 rounded-full bg-white/20' />
        </div>

        {/* Header */}
        <div className='flex items-center justify-between border-b border-white/10 px-4 pb-4'>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5'
            onClick={ onClose }
            type='button'
          >
            <X className='h-5 w-5' />
          </button>
          <h2 className='text-lg font-semibold text-white'>{t( filter.name )}</h2>
          <button
            className='text-sm font-medium text-[hsl(var(--gold))] hover:underline'
            onClick={ handleClear }
            type='button'
          >
            {t( 'searchFilters.clear' )}
          </button>
        </div>

        {/* Search (if searchable) */}
        {
          filter.searchable
            ? (
              <div className='border-b border-white/10 px-4 py-3'>
                <div className='relative'>
                  <Search className='absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                  <input
                    className='h-11 w-full rounded-xl border border-white/10 bg-white/5 pe-4 ps-10 text-sm text-white placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none'
                    onChange={
                      ( e ) => {
                        setSearchQuery( e.target.value )
                      }
                    }
                    placeholder={ t( 'searchFilters.searchPlaceholder' ) }
                    type='text'
                    value={ searchQuery }
                  />
                </div>
              </div>
            )
            : null
        }

        {/* Options list */}
        <div className='flex-1 overflow-y-auto px-4 py-2'>
          {
            filteredOptions.map( ( option ) => {
              const isSelected = localSelection.includes( option.id )

              return (
                <button
                  className='flex w-full items-center justify-between border-b border-white/5 py-4 text-start last:border-0'
                  key={ option.id }
                  onClick={
                    () => {
                      handleToggle( option.id )
                    }
                  }
                  type='button'
                >
                  <span
                    className={
                      cn(
                        'text-base',
                        isSelected ? 'font-medium text-white' : 'text-muted-foreground',
                      )
                    }
                  >
                    {option.label}
                  </span>
                  <div className='flex items-center gap-3'>
                    <span className='text-sm text-muted-foreground'>
                      {option.count.toLocaleString()}
                    </span>
                    <div
                      className={
                        cn(
                          'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
                          isSelected
                            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]'
                            : 'border-white/20',
                        )
                      }
                    >
                      {isSelected ? <Check className='h-4 w-4 text-black' /> : null}
                    </div>
                  </div>
                </button>
              )
            } )
          }
        </div>

        {/* Apply button */}
        <div className='border-t border-white/10 p-4'>
          <button
            className='h-14 w-full rounded-full bg-[hsl(var(--gold))] text-base font-semibold text-black transition-opacity hover:opacity-90'
            onClick={ handleApply }
            type='button'
          >
            {t( 'searchFilters.apply' )} ({( selectedCount || totalResults ).toLocaleString()})
          </button>
        </div>
      </div>

      {/* Desktop Popover */}
      {
        isOpen
          ? (
            <div className='fixed inset-0 z-[60] hidden items-start justify-center pt-32 lg:flex'>
              {/* Backdrop */}
              <div
                className='absolute inset-0 bg-black/40'
                onClick={ onClose }
              />

              {/* Modal */}
              <div className='relative z-10 w-full max-w-md rounded-2xl border border-white/10 bg-[hsl(var(--card))] shadow-2xl'>
                {/* Header */}
                <div className='flex items-center justify-between border-b border-white/10 p-4'>
                  <h2 className='text-lg font-semibold text-white'>{t( filter.name )}</h2>
                  <div className='flex items-center gap-2'>
                    <button
                      className='text-sm font-medium text-[hsl(var(--gold))] hover:underline'
                      onClick={ handleClear }
                      type='button'
                    >
                      {t( 'searchFilters.clear' )}
                    </button>
                    <button
                      className='flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-white/5'
                      onClick={ onClose }
                      type='button'
                    >
                      <X className='h-5 w-5' />
                    </button>
                  </div>
                </div>

                {/* Search (if searchable) */}
                {
                  filter.searchable
                    ? (
                      <div className='border-b border-white/10 px-4 py-3'>
                        <div className='relative'>
                          <Search className='absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground' />
                          <input
                            className='h-10 w-full rounded-xl border border-white/10 bg-white/5 pe-4 ps-10 text-sm text-white placeholder:text-muted-foreground focus:border-[hsl(var(--gold)/0.5)] focus:outline-none'
                            onChange={
                              ( e ) => {
                                setSearchQuery( e.target.value )
                              }
                            }
                            placeholder={ t( 'searchFilters.searchPlaceholder' ) }
                            type='text'
                            value={ searchQuery }
                          />
                        </div>
                      </div>
                    )
                    : null
                }

                {/* Options list */}
                <div className='max-h-[400px] overflow-y-auto px-4 py-2'>
                  {
                    filteredOptions.map( ( option ) => {
                      const isSelected = localSelection.includes( option.id )

                      return (
                        <button
                          className='flex w-full items-center justify-between border-b border-white/5 py-3 text-start last:border-0'
                          key={ option.id }
                          onClick={
                            () => {
                              handleToggle( option.id )
                            }
                          }
                          type='button'
                        >
                          <span
                            className={
                              cn(
                                'text-sm',
                                isSelected ? 'font-medium text-white' : 'text-muted-foreground',
                              )
                            }
                          >
                            {option.label}
                          </span>
                          <div className='flex items-center gap-3'>
                            <span className='text-xs text-muted-foreground'>
                              {option.count.toLocaleString()}
                            </span>
                            <div
                              className={
                                cn(
                                  'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                                  isSelected
                                    ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]'
                                    : 'border-white/20',
                                )
                              }
                            >
                              {isSelected ? <Check className='h-3 w-3 text-black' /> : null}
                            </div>
                          </div>
                        </button>
                      )
                    } )
                  }
                </div>

                {/* Apply button */}
                <div className='border-t border-white/10 p-4'>
                  <button
                    className='h-11 w-full rounded-xl bg-[hsl(var(--gold))] text-sm font-semibold text-black transition-opacity hover:opacity-90'
                    onClick={ handleApply }
                    type='button'
                  >
                    {t( 'searchFilters.apply' )} ({( selectedCount || totalResults ).toLocaleString()})
                  </button>
                </div>
              </div>
            </div>
          )
          : null
      }
    </>
  )
}
