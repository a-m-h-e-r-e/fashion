/* eslint-disable sort-keys */
import { HttpResponse, delay } from 'msw'
import { type IRestHandlers } from '../make-rest-handlers'
import type { Promo, PromosResponse, SizeOption, SizeOptionsResponse, QuickFilter, QuickFiltersResponse } from '@/lib/types'

/**
 * Mock promotional banners
 */
const mockPromos: Array<Promo> = [
  {
    id          : 'promo-register',
    type        : 'register',
    titleKey    : 'promos.register.title',
    subtitleKey : 'promos.register.subtitle',
    imageUrl    : null,
    ctaKey      : 'promos.register.cta',
    gradient    : 'linear-gradient(135deg, #1a472a 0%, #2d5a3d 100%)',
    link        : '/register',
  },
  {
    id          : 'promo-sale',
    type        : 'sale',
    titleKey    : 'promos.sale.title',
    subtitleKey : 'promos.sale.subtitle',
    imageUrl    : 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&h=400&fit=crop',
    ctaKey      : null,
    gradient    : 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 100%)',
    link        : '/sale',
  },
  {
    id          : 'promo-budget',
    type        : 'budget',
    titleKey    : 'promos.budget.title',
    subtitleKey : 'promos.budget.subtitle',
    imageUrl    : 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    ctaKey      : null,
    gradient    : 'linear-gradient(135deg, #6b5b3d 0%, #8a7355 100%)',
    link        : '/budget',
  },
  {
    id          : 'promo-brands',
    type        : 'brands',
    titleKey    : 'promos.brands.title',
    subtitleKey : 'promos.brands.subtitle',
    imageUrl    : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
    ctaKey      : null,
    gradient    : 'linear-gradient(135deg, #3d3d3d 0%, #5a5a5a 100%)',
    link        : '/brands',
  },
  {
    id          : 'promo-seasonal',
    type        : 'seasonal',
    titleKey    : 'promos.seasonal.title',
    subtitleKey : 'promos.seasonal.subtitle',
    imageUrl    : 'https://images.unsplash.com/photo-1544923408-75c5cef46f14?w=600&h=400&fit=crop',
    ctaKey      : null,
    gradient    : 'linear-gradient(135deg, #4a3728 0%, #6b5040 100%)',
    link        : '/seasonal',
  },
]

/**
 * Mock size options with sample images
 */
const mockSizes: Array<SizeOption> = [
  {
    id       : 'size-xs',
    label    : 'XS',
    imageUrl : 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=200&h=200&fit=crop',
    count    : 3420,
  },
  {
    id       : 'size-s',
    label    : 'S',
    imageUrl : 'https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?w=200&h=200&fit=crop',
    count    : 8750,
  },
  {
    id       : 'size-m',
    label    : 'M',
    imageUrl : 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=200&h=200&fit=crop',
    count    : 12340,
  },
  {
    id       : 'size-l',
    label    : 'L',
    imageUrl : 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=200&h=200&fit=crop',
    count    : 9870,
  },
  {
    id       : 'size-xl',
    label    : 'XL',
    imageUrl : 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&h=200&fit=crop',
    count    : 5640,
  },
  {
    id       : 'size-2xl',
    label    : '2XL',
    imageUrl : 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=200&h=200&fit=crop',
    count    : 2180,
  },
]

/**
 * Mock quick filters
 */
const mockQuickFilters: Array<QuickFilter> = [
  {
    id       : 'filter-budget',
    type     : 'budget',
    labelKey : 'filters.upTo10',
    imageUrl : 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=200&h=200&fit=crop',
    badge    : 'Best Price',
  },
  {
    id       : 'filter-condition',
    type     : 'condition',
    labelKey : 'filters.perfectCondition',
    imageUrl : 'https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=200&h=200&fit=crop',
    badge    : null,
  },
  {
    id       : 'filter-sale',
    type     : 'sale',
    labelKey : 'filters.sale',
    imageUrl : 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=200&h=200&fit=crop',
    badge    : '-60%',
  },
]

const promosRestHandlers: Array<IRestHandlers> = [
  {
    endpoint     : '*/api/promos',
    mockResponse : async () => {
      await delay( 100 )
      console.log( '--------------------------------' )
      console.log( 'promosRestHandlers' )
      console.log( '--------------------------------' )

      const response: PromosResponse = { promos: mockPromos }

      return HttpResponse.json( response )
    },
  },
  {
    endpoint     : '*/api/sizes',
    mockResponse : async () => {
      await delay( 80 )

      const response: SizeOptionsResponse = { sizes: mockSizes }

      return HttpResponse.json( response )
    },
  },
  {
    endpoint     : '*/api/filters/quick',
    mockResponse : async () => {
      await delay( 80 )

      const response: QuickFiltersResponse = { filters: mockQuickFilters }

      return HttpResponse.json( response )
    },
  },
]

export default promosRestHandlers
