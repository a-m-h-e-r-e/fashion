/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @stylistic/padding-line-between-statements */
/**
 * Core domain types for the Fashion app
 */

// =============================================================================
// Categories (Hierarchical)
// =============================================================================

export interface Category {
  id        : string
  name      : string // Translation key (e.g., "categories.women")
  imageUrl  : string
  itemCount : number
  slug      : string
  parentId  : string | null
  children? : Array<Category>
}

// =============================================================================
// Products
// =============================================================================

export interface Product {
  id            : string
  title         : string
  price         : number
  originalPrice : number | null
  imageUrl      : string
  discount      : number | null // Percentage discount (e.g., 75 for 75% off)
  size          : string
  brand         : string
  categoryId    : string // Links to leaf category
  lastUpdated   : string // ISO date string
}

// =============================================================================
// Promotional Banners
// =============================================================================

export type PromoType = 'brands' | 'budget' | 'register' | 'sale' | 'seasonal'
export interface Promo {
  id          : string
  type        : PromoType
  titleKey    : string // Translation key for title
  subtitleKey : string // Translation key for subtitle
  imageUrl    : string | null
  ctaKey      : string | null // Translation key for call-to-action
  gradient    : string // CSS gradient or color
  link        : string
}

// =============================================================================
// Size Filter
// =============================================================================

export interface SizeOption {
  id       : string
  label    : string // XS, S, M, L, XL, 2XL, etc.
  imageUrl : string
  count?   : number
}

// =============================================================================
// Quick Filters
// =============================================================================

export type QuickFilterType = 'budget' | 'condition' | 'sale'
export interface QuickFilter {
  id       : string
  type     : QuickFilterType
  labelKey : string // Translation key
  imageUrl : string
  badge    : string | null // e.g., "Best Price", "-60%"
}

// =============================================================================
// Search Filters
// =============================================================================

export interface FilterOption {
  id    : string
  label : string
  count : number
}

export interface FilterConfig {
  id          : string
  name        : string // Translation key
  type        : 'multi' | 'range' | 'single'
  options     : Array<FilterOption>
  searchable? : boolean
}

// =============================================================================
// API Response Types
// =============================================================================

export interface CategoriesResponse { categories: Array<Category> }
export interface ProductsResponse {
  products : Array<Product>
  total    : number
}
export interface PromosResponse { promos: Array<Promo> }
export interface SizeOptionsResponse { sizes: Array<SizeOption> }
export interface QuickFiltersResponse { filters: Array<QuickFilter> }
export interface FiltersResponse { filters: Array<FilterConfig> }

// =============================================================================
// Navigation
// =============================================================================

export type NavItemId = 'chats' | 'favorites' | 'home' | 'profile'
export interface NavItem {
  id       : NavItemId
  labelKey : string // Translation key
  href     : string
}
