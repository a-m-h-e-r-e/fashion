'use client'

import { useState, useCallback } from 'react'
import {
  SearchHeader,
  SearchDesktopHeader,
  SubcategoryScroll,
  FilterBar,
  FilterBottomSheet,
  FilterSidebar,
  SearchProductCard,
} from '@/components/search'
import { BottomNavigation } from '@/components/home'
import type { Category, Product, FilterConfig } from '@/lib/types'

interface SearchPageClientProps {
  category      : Category
  subcategories : Array<Category>
  products      : Array<Product>
  filters       : Array<FilterConfig>
  totalProducts : number
  categoryName  : string
}

export function SearchPageClient( {
  category,
  subcategories,
  products,
  filters,
  totalProducts,
  categoryName,
}: SearchPageClientProps ) {
  const [ selectedFilters, setSelectedFilters ] = useState<Record<string, Array<string>>>( {} )
  const [ activeFilter, setActiveFilter ] = useState<string | null>( null )
  const [ isFilterOpen, setIsFilterOpen ] = useState( false )

  // Get currently active filter config
  const activeFilterConfig = activeFilter
    ? filters.find( ( f ) => f.id === activeFilter ) ?? null
    : null

  // Check if any filters are selected
  const hasActiveFilters = Object.values( selectedFilters )
    .some( ( vals ) => 0 < vals.length )

  const handleFilterClick = useCallback( ( filterId: string ) => {
    setActiveFilter( filterId )
    setIsFilterOpen( true )
  }, [] )

  const handleClearFilter = useCallback( ( filterId: string ) => {
    setSelectedFilters( ( prev ) => {
      const updated = { ...prev }

      delete updated[filterId]

      return updated
    } )
  }, [] )

  const handleApplyFilter = useCallback( ( filterId: string, values: Array<string> ) => {
    setSelectedFilters( ( prev ) => {
      if ( 0 === values.length ) {
        const updated = { ...prev }

        delete updated[filterId]

        return updated
      }

      return {
        ...prev,
        [filterId] : values,
      }
    } )
  }, [] )

  const handleCloseFilter = useCallback( () => {
    setIsFilterOpen( false )
    setActiveFilter( null )
  }, [] )

  const handleMainFilterClick = useCallback( () => {
    // Open the first filter by default
    if ( 0 < filters.length ) {
      setActiveFilter( filters[0].id )
      setIsFilterOpen( true )
    }
  }, [ filters ] )

  // Handle toggling a single option (for desktop sidebar)
  const handleToggleOption = useCallback( ( filterId: string, optionId: string ) => {
    const filter = filters.find( ( f ) => f.id === filterId )

    if ( !filter ) {
      return
    }

    setSelectedFilters( ( prev ) => {
      const currentValues = prev[filterId] ?? []

      if ( 'single' === filter.type ) {
        // Single select - replace value
        return {
          ...prev,
          [filterId] : [ optionId ],
        }
      }

      // Multi select - toggle value
      const newValues = currentValues.includes( optionId )
        ? currentValues.filter( ( id ) => id !== optionId )
        : [ ...currentValues, optionId ]

      if ( 0 === newValues.length ) {
        const updated = { ...prev }

        delete updated[filterId]

        return updated
      }

      return {
        ...prev,
        [filterId] : newValues,
      }
    } )
  }, [ filters ] )

  return (
    <div className='noise-overlay min-h-screen pb-24 lg:pb-8 lg:pt-20'>
      {/* Mobile: Search Header */}
      <SearchHeader
        categoryName={ categoryName }
        className='lg:hidden'
        hasFilters={ hasActiveFilters }
        onFilterClick={ handleMainFilterClick }
      />

      {/* Desktop: Search Header with search bar */}
      <SearchDesktopHeader categoryName={ categoryName } />

      {/* Mobile: Subcategory scroll */}
      <SubcategoryScroll
        className='lg:hidden'
        parentCategory={ category.slug }
        subcategories={ subcategories }
      />

      {/* Mobile: Filter chips bar */}
      <FilterBar
        className='lg:hidden'
        filters={ filters }
        onClearFilter={ handleClearFilter }
        onFilterClick={ handleFilterClick }
        selectedFilters={ selectedFilters }
      />

      {/* Desktop layout with sidebar */}
      <div className='mx-auto max-w-7xl px-4 py-4 lg:flex lg:gap-8 lg:px-8 lg:py-6'>
        {/* Desktop: Filter sidebar (left) */}
        <FilterSidebar
          className='hidden lg:block'
          filters={ filters }
          onClearFilter={ handleClearFilter }
          onToggleOption={ handleToggleOption }
          selectedFilters={ selectedFilters }
        />

        {/* Main content area */}
        <main className='flex-1'>
          {/* Desktop: Categories header and scroll */}
          <div className='mb-6 hidden lg:block'>
            <div className='mb-4 flex items-baseline justify-between'>
              <h2 className='font-serif text-lg font-semibold text-white'>
                {categoryName}
              </h2>
              <span className='text-sm text-muted-foreground'>
                {totalProducts.toLocaleString()} items
              </span>
            </div>
            <SubcategoryScroll
              className='border-0 bg-transparent [&>div]:p-0'
              parentCategory={ category.slug }
              subcategories={ subcategories }
            />
          </div>

          {/* Products grid */}
          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4'>
            {
              products.map( ( product ) => (
                <SearchProductCard key={ product.id } product={ product } />
              ) )
            }
          </div>

          {/* Load more indicator */}
          {
            products.length < totalProducts
              ? (
                <div className='mt-8 flex justify-center'>
                  <button
                    className='rounded-full border border-white/20 px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5'
                    type='button'
                  >
                    Load more
                  </button>
                </div>
              )
              : null
          }
        </main>
      </div>

      {/* Mobile: Filter Bottom Sheet */}
      <FilterBottomSheet
        filter={ activeFilterConfig }
        isOpen={ isFilterOpen }
        onApply={ handleApplyFilter }
        onClose={ handleCloseFilter }
        selectedValues={ activeFilter ? selectedFilters[activeFilter] ?? [] : [] }
        totalResults={ totalProducts }
      />

      {/* Bottom Navigation - Mobile only */}
      <BottomNavigation activeItem='home' />
    </div>
  )
}
