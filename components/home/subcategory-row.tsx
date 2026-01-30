'use client'

import type { Category } from '@/lib/types'
import { SubcategoryCard } from './subcategory-card'
import { cn } from '@/lib/utils'

interface SubcategoryRowProps {
  subcategories : Array<Category>
  className?    : string
}

export function SubcategoryRow( { subcategories, className }: SubcategoryRowProps ) {
  if ( 0 === subcategories.length ) {
    return null
  }

  return (
    <div
      className={
        cn(
          'grid grid-cols-2 gap-3 sm:grid-cols-4 lg:gap-4',
          className,
        )
      }
    >
      {
        subcategories.map( ( subcategory ) => (
          <SubcategoryCard key={ subcategory.id } subcategory={ subcategory } />
        ) )
      }
    </div>
  )
}
