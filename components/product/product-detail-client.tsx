'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { Link as RoutedLink } from '@/i18n/navigation'
import {
  Music2,
  Send,
  Sparkles,
  Truck,
} from 'lucide-react'
import { BottomNavigation } from '@/components/home'
import { formatPriceValue } from '@/lib/format-price'
import type { Product } from '@/lib/types'

interface ProductDetailClientProps {
  product         : Product
  relatedProducts : Array<Product>
}

const formatVariantEntry = ( key: string, value: string ): string => `${ key } ${ value }`

export function ProductDetailClient( { product, relatedProducts }: ProductDetailClientProps ) {
  const t = useTranslations( 'products' )
  const td = useTranslations( 'products.detail' )
  const variants = product.variants ?? []
  const availableVariants = variants.filter( ( variant ) => variant.isAvailable )
  const [ selectedVariantSku, setSelectedVariantSku ] = useState( availableVariants[0]?.sku ?? variants[0]?.sku ?? '' )
  const selectedVariant = variants.find( ( variant ) => variant.sku === selectedVariantSku ) ?? availableVariants[0] ?? variants[0]
  const selectedPrice = selectedVariant?.price ?? product.price
  const selectedOriginalPrice = selectedVariant?.originalPrice ?? product.originalPrice
  const selectedDiscount = null !== selectedOriginalPrice && 0 < selectedOriginalPrice
    ? Math.round( ( ( selectedOriginalPrice - selectedPrice ) / selectedOriginalPrice ) * 100 )
    : product.discount
  const selectedImage = selectedVariant?.imageUrl ?? product.imageUrl
  const productDescription = 'string' === typeof product.description
    ? product.description.trim()
    : ''

  return (
    <div className='noise-overlay min-h-screen pb-32 lg:pb-16'>

      <div className='lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-8'>
        <div className='lg:grid lg:grid-cols-2 lg:gap-12'>
          {/* Image Gallery */}
          <div className='relative'>
            {/* Main Image */}
            <div className='relative aspect-[4/5] overflow-hidden bg-white/5 lg:rounded-3xl'>
              <Image
                alt={ product.title }
                className='object-cover'
                fill
                priority
                sizes='(max-width: 1024px) 100vw, 50vw'
                src={ selectedImage }
              />

              {/* Discount Badge */}
              {
                selectedDiscount
                  ? (
                    <div className='absolute start-4 top-4 rounded-full bg-[hsl(var(--rose))] px-3 py-1.5 text-base font-bold text-white lg:start-6 lg:top-6'>
                      -{selectedDiscount}%
                    </div>
                  )
                  : null
              }
            </div>
          </div>

          {/* Product Info */}
          <div className='px-4 pt-6 lg:px-0 lg:pt-0'>
            {/* Brand */}
            <p className='text-base font-medium uppercase tracking-wider text-[hsl(var(--gold))]'>
              {product.brand}
            </p>

            {/* Title */}
            <h1 className='mt-2 font-serif text-2xl font-semibold text-white lg:text-3xl'>
              {product.title}
            </h1>

            {/* Price */}
            <div className='mt-4 flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-[hsl(var(--gold))] lg:text-4xl'>
                {t( 'priceWithCurrency', { price: formatPriceValue( selectedPrice ) } )}
              </span>
              {
                selectedOriginalPrice
                  ? (
                    <span className='text-xl text-muted-foreground line-through'>
                      {t( 'priceWithCurrency', { price: formatPriceValue( selectedOriginalPrice ) } )}
                    </span>
                  )
                  : null
              }
            </div>

            {/* Variants */}
            <div className='mt-6'>
              <div className='mb-3 flex items-center justify-between'>
                <span className='font-medium text-white'>{td( 'availableLabel' )}</span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {
                  availableVariants.map( ( variant ) => {
                    const isSelected = variant.sku === selectedVariant?.sku
                    const variantDetailEntries = Object.entries( variant.attributes )
                      .filter( ( [ key, value ] ) => 'brand' !== key.toLowerCase() && 0 < key.trim().length && 0 < String( value )
                        .trim().length )
                    const hasMultipleAttributes = 1 < variantDetailEntries.length

                    return (
                      <button
                        className={
                          `${
                            hasMultipleAttributes
                              ? 'rounded-xl px-3 py-3'
                              : 'rounded-full px-3 py-2'
                          } border text-left transition-all ${
                            isSelected
                              ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]'
                              : 'border-white/20 bg-white/5 text-white hover:border-white/40'
                          }`
                        }
                        key={ variant.sku }
                        onClick={
                          () => {
                            setSelectedVariantSku( variant.sku )
                          }
                        }
                        type='button'
                      >
                        {
                          hasMultipleAttributes
                            ? (
                              <div className='flex flex-wrap gap-2'>
                                {
                                  variantDetailEntries
                                    .map( ( [ key, value ] ) => (
                                      <span
                                        className={ `rounded-full border px-2 py-1 text-sm ${ isSelected ? 'border-[hsl(var(--gold))]/40 bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]' : 'border-white/10 bg-background/30 text-white' }` }
                                        key={ `${ variant.sku }-${ key }` }
                                      >
                                        {formatVariantEntry( key, String( value ) )}
                                      </span>
                                    ) )
                                }
                              </div>
                            )
                            : (
                              <span className='text-sm font-medium'>
                                {
                                  0 < variantDetailEntries.length
                                    ? formatVariantEntry( variantDetailEntries[0][0], String( variantDetailEntries[0][1] ) )
                                    : variant.sku
                                }
                              </span>
                            )
                        }
                      </button>
                    )
                  } )
                }
              </div>
            </div>

            {/* Trust Badges */}
            <div className='mt-6'>
              <div className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3'>
                <Truck className='h-5 w-5 text-[hsl(var(--gold))]' />
                <div>
                  <p className='text-base font-medium text-white'>{td( 'fastDeliveryTitle' )}</p>
                  <p className='text-sm text-muted-foreground'>{td( 'fastDeliverySubtitle' )}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='mt-6'>
              <h3 className='mb-2 font-medium text-white'>{td( 'descriptionHeading' )}</h3>
              {
                0 < productDescription.length
                  ? (
                    <p className='whitespace-pre-line leading-relaxed text-muted-foreground'>
                      {productDescription}
                    </p>
                  )
                  : (
                    <div className='space-y-1 leading-relaxed text-muted-foreground'>
                      <p>{td( 'fallbackDelivery' )}</p>
                      <p>{td( 'fallbackPhone' )}</p>
                      <p>{td( 'fallbackAddress' )}</p>
                    </div>
                  )
              }
            </div>

          </div>
        </div>

        {/* Related Products */}
        {
          0 < relatedProducts.length
            ? (
              <section className='mt-12 px-4 lg:mt-16 lg:px-0'>
                <h2 className='mb-6 font-serif text-xl font-semibold text-white'>
                  {td( 'relatedTitle' )}
                </h2>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                  {
                    relatedProducts.slice( 0, 4 )
                      .map( ( related ) => (
                        <RoutedLink
                          className='group'
                          href={ `/product/${ related.id }` }
                          key={ related.id }
                        >
                          <div className='relative aspect-[4/5] overflow-hidden rounded-2xl bg-white/5'>
                            <Image
                              alt={ related.title }
                              className='object-cover transition-transform duration-300 group-hover:scale-105'
                              fill
                              sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw'
                              src={ related.imageUrl }
                            />
                            {
                              related.discount
                                ? (
                                  <div className='absolute end-2 top-2 rounded-full bg-[hsl(var(--rose))] px-2.5 py-1 text-sm font-bold text-white'>
                                    -{related.discount}%
                                  </div>
                                )
                                : null
                            }
                          </div>
                          <div className='mt-3'>
                            <div className='flex items-baseline gap-2'>
                              <span className='font-bold text-[hsl(var(--gold))]'>
                                {t( 'priceWithCurrency', { price: formatPriceValue( related.price ) } )}
                              </span>
                              {
                                related.originalPrice
                                  ? (
                                    <span className='text-base text-muted-foreground line-through'>
                                      {t( 'priceWithCurrency', { price: formatPriceValue( related.originalPrice ) } )}
                                    </span>
                                  )
                                  : null
                              }
                            </div>
                            <p className='mt-1 line-clamp-1 text-base text-muted-foreground'>
                              {related.brand}
                            </p>
                          </div>
                        </RoutedLink>
                      ) )
                  }
                </div>
              </section>
            )
            : null
        }
      </div>

      <footer className='mt-12 border-t border-white/10 bg-background/50 px-4 py-8 backdrop-blur-sm lg:px-8'>
        <div className='mx-auto w-full max-w-7xl'>
          <div className='flex items-start gap-3'>
            <div className='rounded-xl bg-[hsl(var(--gold))]/20 p-2.5'>
              <Sparkles className='h-5 w-5 text-[hsl(var(--gold))]' />
            </div>
            <div>
              <p className='text-lg font-semibold text-white'>{td( 'footerBrandName' )}</p>
              <p className='mt-1 text-sm text-[hsl(var(--gold))]'>{td( 'footerTagline' )}</p>
            </div>
          </div>

          <p className='mt-4 text-sm leading-relaxed text-muted-foreground'>
            {td( 'footerHeadline' )}
          </p>

          <div className='mt-4 grid gap-2 sm:grid-cols-2'>
            <a
              className='flex items-center justify-between rounded-xl border border-white/10 bg-background/30 px-3 py-2 text-sm text-white transition-colors hover:border-[hsl(var(--gold))]/40 hover:bg-background/50'
              href='https://t.me/lightfashions'
              rel='noreferrer'
              target='_blank'
            >
              <span className='flex items-center gap-2'>
                <Send className='h-4 w-4 text-[hsl(var(--gold))]' />
                <span>{td( 'footerTelegramLabel' )}</span>
              </span>
              <span className='text-muted-foreground'>{td( 'footerTelegramHandle' )}</span>
            </a>
            <a
              className='flex items-center justify-between rounded-xl border border-white/10 bg-background/30 px-3 py-2 text-sm text-white transition-colors hover:border-[hsl(var(--gold))]/40 hover:bg-background/50'
              href='https://www.tiktok.com/@lightfashions'
              rel='noreferrer'
              target='_blank'
            >
              <span className='flex items-center gap-2'>
                <Music2 className='h-4 w-4 text-[hsl(var(--gold))]' />
                <span>{td( 'footerTiktokLabel' )}</span>
              </span>
              <span className='text-muted-foreground'>{td( 'footerTiktokHandle' )}</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Bottom Navigation - Mobile only (behind the action bar) */}
      <div className='hidden'>
        <BottomNavigation activeItem='home' />
      </div>
    </div>
  )
}
