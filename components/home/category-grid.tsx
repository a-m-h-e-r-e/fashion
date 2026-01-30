'use client'

import type { Category } from '@/lib/types'
import { CategoryCard } from './category-card'
import { SectionHeader } from './section-header'
import { cn } from '@/lib/utils'

interface CategoryGridProps {
  categories : Array<Category>
  className? : string
}

export function CategoryGrid( { categories, className }: CategoryGridProps ) {
  // Only show top-level categories (parentId is null)
  const topLevelCategories = categories.filter( ( cat ) => null === cat.parentId )

  return (
    <section className={ cn( 'space-y-4', className ) }>
      <SectionHeader href='/categories' titleKey='categories.title' />
      <div className='grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:gap-4 xl:grid-cols-5'>
        {
          topLevelCategories.map( ( category ) => (
            <CategoryCard category={ category } key={ category.id } />
          ) )
        }
      </div>
    </section>
  )
}
