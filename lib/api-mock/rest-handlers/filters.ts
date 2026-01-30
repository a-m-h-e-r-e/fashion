/* eslint-disable sort-keys */
import { HttpResponse, delay } from 'msw'
import { type IRestHandlers } from '../make-rest-handlers'
import type { FilterOption, FilterConfig, FiltersResponse } from '@/lib/types'

/**
 * Mock filter data - sizes
 */
const sizeOptions: Array<FilterOption> = [
  {
    id    : 'size-2xs',
    label : '2XS',
    count : 32,
  },
  {
    id    : 'size-xs',
    label : 'XS',
    count : 225,
  },
  {
    id    : 'size-s',
    label : 'S',
    count : 1512,
  },
  {
    id    : 'size-m',
    label : 'M',
    count : 1631,
  },
  {
    id    : 'size-l',
    label : 'L',
    count : 1321,
  },
  {
    id    : 'size-xl',
    label : 'XL',
    count : 1094,
  },
  {
    id    : 'size-2xl',
    label : '2XL',
    count : 403,
  },
  {
    id    : 'size-3xl',
    label : '3XL',
    count : 184,
  },
]

/**
 * Mock filter data - brands
 */
const brandOptions: Array<FilterOption> = [
  {
    id    : 'brand-atmosphere',
    label : 'Atmosphere',
    count : 1,
  },
  {
    id    : 'brand-bershka',
    label : 'Bershka',
    count : 8,
  },
  {
    id    : 'brand-ca',
    label : 'C&A',
    count : 11,
  },
  {
    id    : 'brand-cropp',
    label : 'Cropp',
    count : 18,
  },
  {
    id    : 'brand-ff',
    label : 'F&F',
    count : 12,
  },
  {
    id    : 'brand-george',
    label : 'George',
    count : 4,
  },
  {
    id    : 'brand-hm',
    label : 'H&M',
    count : 69,
  },
  {
    id    : 'brand-house',
    label : 'House',
    count : 19,
  },
  {
    id    : 'brand-mango',
    label : 'Mango',
    count : 45,
  },
  {
    id    : 'brand-mohito',
    label : 'Mohito',
    count : 23,
  },
  {
    id    : 'brand-reserved',
    label : 'Reserved',
    count : 87,
  },
  {
    id    : 'brand-sinsay',
    label : 'Sinsay',
    count : 156,
  },
  {
    id    : 'brand-zara',
    label : 'Zara',
    count : 234,
  },
]

/**
 * Mock filter data - conditions
 */
const conditionOptions: Array<FilterOption> = [
  {
    id    : 'condition-new',
    label : 'New with tags',
    count : 245,
  },
  {
    id    : 'condition-excellent',
    label : 'Excellent',
    count : 567,
  },
  {
    id    : 'condition-very-good',
    label : 'Very good',
    count : 892,
  },
  {
    id    : 'condition-good',
    label : 'Good',
    count : 1234,
  },
  {
    id    : 'condition-satisfactory',
    label : 'Satisfactory',
    count : 156,
  },
]

/**
 * Mock filter data - price ranges
 */
const priceOptions: Array<FilterOption> = [
  {
    id    : 'price-0-5',
    label : '$0 - $5',
    count : 423,
  },
  {
    id    : 'price-5-10',
    label : '$5 - $10',
    count : 567,
  },
  {
    id    : 'price-10-20',
    label : '$10 - $20',
    count : 892,
  },
  {
    id    : 'price-20-50',
    label : '$20 - $50',
    count : 1234,
  },
  {
    id    : 'price-50-100',
    label : '$50 - $100',
    count : 456,
  },
  {
    id    : 'price-100-plus',
    label : '$100+',
    count : 189,
  },
]

/**
 * Mock filter data - colors
 */
const colorOptions: Array<FilterOption> = [
  {
    id    : 'color-black',
    label : 'Black',
    count : 892,
  },
  {
    id    : 'color-white',
    label : 'White',
    count : 567,
  },
  {
    id    : 'color-blue',
    label : 'Blue',
    count : 456,
  },
  {
    id    : 'color-red',
    label : 'Red',
    count : 234,
  },
  {
    id    : 'color-green',
    label : 'Green',
    count : 189,
  },
  {
    id    : 'color-yellow',
    label : 'Yellow',
    count : 123,
  },
  {
    id    : 'color-pink',
    label : 'Pink',
    count : 345,
  },
  {
    id    : 'color-brown',
    label : 'Brown',
    count : 267,
  },
  {
    id    : 'color-gray',
    label : 'Gray',
    count : 456,
  },
  {
    id    : 'color-beige',
    label : 'Beige',
    count : 234,
  },
]

/**
 * Get filters based on category
 */
const getFiltersForCategory = ( categorySlug: string ): Array<FilterConfig> => {
  // Base filters available for all categories
  const baseFilters: Array<FilterConfig> = [
    {
      id         : 'price',
      name       : 'searchFilters.price',
      type       : 'single',
      options    : priceOptions,
      searchable : false,
    },
    {
      id         : 'size',
      name       : 'searchFilters.size',
      type       : 'multi',
      options    : sizeOptions,
      searchable : true,
    },
    {
      id         : 'brand',
      name       : 'searchFilters.brand',
      type       : 'multi',
      options    : brandOptions,
      searchable : true,
    },
    {
      id         : 'condition',
      name       : 'searchFilters.condition',
      type       : 'single',
      options    : conditionOptions,
      searchable : false,
    },
    {
      id         : 'color',
      name       : 'searchFilters.color',
      type       : 'multi',
      options    : colorOptions,
      searchable : false,
    },
  ]

  // Adjust counts based on category (simulate different availability)
  if ( categorySlug.startsWith( 'men' ) ) {
    return baseFilters.map( ( filter ) => ( {
      ...filter,
      options : filter.options.map( ( opt ) => ( {
        ...opt,
        count : Math.floor( opt.count * 0.4 ), // Men's category has fewer items
      } ) ),
    } ) )
  }

  if ( categorySlug.startsWith( 'children' ) ) {
    return baseFilters.map( ( filter ) => ( {
      ...filter,
      options : filter.options.map( ( opt ) => ( {
        ...opt,
        count : Math.floor( opt.count * 0.2 ), // Children's category has even fewer
      } ) ),
    } ) )
  }

  return baseFilters
}

const filtersRestHandlers: Array<IRestHandlers> = [
  {
    endpoint     : '*/api/filters',
    mockResponse : async ( { request } ) => {
      await delay( 100 )

      const url = new URL( request.url )
      const category = url.searchParams.get( 'category' ) ?? 'all'

      const filters = getFiltersForCategory( category )

      const response: FiltersResponse = { filters }

      return HttpResponse.json( response )
    },
  },
]

export default filtersRestHandlers
