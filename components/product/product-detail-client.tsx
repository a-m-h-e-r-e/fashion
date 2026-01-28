'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Heart,
  Share2,
  Shield,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Star,
  Check,
} from 'lucide-react'
import { BottomNavigation } from '@/components/home'
import type { Product } from '@/lib/types'

interface ProductDetailClientProps {
  product         : Product
  relatedProducts : Array<Product>
}

// Mock additional product images for gallery
const generateGalleryImages = ( mainImage: string ) => [
  mainImage,
  mainImage.replace( 'w=400', 'w=401' ), // Slight variation to simulate different images
  mainImage.replace( 'w=400', 'w=402' ),
  mainImage.replace( 'w=400', 'w=403' ),
]

export function ProductDetailClient( { product, relatedProducts }: ProductDetailClientProps ) {
  const [ currentImageIndex, setCurrentImageIndex ] = useState( 0 )
  const [ isFavorite, setIsFavorite ] = useState( false )
  const [ selectedSize, setSelectedSize ] = useState( product.size )

  const galleryImages = generateGalleryImages( product.imageUrl )

  // Mock sizes based on the product's actual size
  const availableSizes = [ 'XS', 'S', 'M', 'L', 'XL' ]

  const handlePrevImage = () => {
    setCurrentImageIndex( ( prev ) => {
      if ( 0 === prev ) {
        return galleryImages.length - 1
      }

      return prev - 1
    } )
  }

  const handleNextImage = () => {
    setCurrentImageIndex( ( prev ) => {
      if ( galleryImages.length - 1 === prev ) {
        return 0
      }

      return prev + 1
    } )
  }

  const formatDate = ( dateString: string ) => {
    const date = new Date( dateString )
    const now = new Date()
    const diffDays = Math.floor( ( now.getTime() - date.getTime() ) / ( 1000 * 60 * 60 * 24 ) )

    if ( 0 === diffDays ) {
      return 'Today'
    }

    if ( 1 === diffDays ) {
      return 'Yesterday'
    }

    if ( 7 > diffDays ) {
      return `${ diffDays } days ago`
    }

    return date.toLocaleDateString( 'en-US', {
      day   : 'numeric',
      month : 'short',
    } )
  }

  return (
    <div className='noise-overlay min-h-screen pb-32 lg:pb-16 lg:pt-20'>
      {/* Mobile Header */}
      <header className='fixed inset-x-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent px-4 py-4 lg:hidden'>
        <Link
          className='flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60'
          href='javascript:history.back()'
        >
          <ArrowLeft className='h-5 w-5 text-white' />
        </Link>
        <div className='flex gap-2'>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60'
            onClick={
              () => {
                setIsFavorite( !isFavorite )
              }
            }
            type='button'
          >
            <Heart
              className={ `h-5 w-5 transition-colors ${ isFavorite ? 'fill-[hsl(var(--rose))] text-[hsl(var(--rose))]' : 'text-white' }` }
            />
          </button>
          <button
            className='flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60'
            type='button'
          >
            <Share2 className='h-5 w-5 text-white' />
          </button>
        </div>
      </header>

      {/* Desktop Header */}
      <header className='fixed inset-x-0 top-0 z-50 hidden border-b border-white/10 bg-background/80 backdrop-blur-xl lg:block'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-8 py-4'>
          <Link
            className='flex items-center gap-2 text-muted-foreground transition-colors hover:text-white'
            href='javascript:history.back()'
          >
            <ArrowLeft className='h-5 w-5' />
            <span className='font-medium'>Back</span>
          </Link>
          <div className='flex gap-3'>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/5'
              onClick={
                () => {
                  setIsFavorite( !isFavorite )
                }
              }
              type='button'
            >
              <Heart
                className={ `h-5 w-5 transition-colors ${ isFavorite ? 'fill-[hsl(var(--rose))] text-[hsl(var(--rose))]' : 'text-white' }` }
              />
            </button>
            <button
              className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/5'
              type='button'
            >
              <Share2 className='h-5 w-5 text-white' />
            </button>
          </div>
        </div>
      </header>

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
                src={ galleryImages[currentImageIndex] }
              />

              {/* Discount Badge */}
              {
                product.discount
                  ? (
                    <div className='absolute start-4 top-4 rounded-full bg-[hsl(var(--rose))] px-3 py-1.5 text-sm font-bold text-white lg:start-6 lg:top-6'>
                      -{product.discount}%
                    </div>
                  )
                  : null
              }

              {/* Navigation Arrows */}
              <button
                className='absolute start-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60 lg:flex'
                onClick={ handlePrevImage }
                type='button'
              >
                <ChevronLeft className='h-6 w-6 text-white' />
              </button>
              <button
                className='absolute end-2 top-1/2 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm transition-colors hover:bg-black/60 lg:flex'
                onClick={ handleNextImage }
                type='button'
              >
                <ChevronRight className='h-6 w-6 text-white' />
              </button>

              {/* Image Indicators */}
              <div className='absolute inset-x-0 bottom-4 flex justify-center gap-2'>
                {
                  galleryImages.map( ( _, idx ) => (
                    <button
                      className={
                        `h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? 'w-6 bg-white'
                            : 'w-2 bg-white/40'
                        }`
                      }
                      key={ idx }
                      onClick={
                        () => {
                          setCurrentImageIndex( idx )
                        }
                      }
                      type='button'
                    />
                  ) )
                }
              </div>
            </div>

            {/* Thumbnail Gallery - Desktop */}
            <div className='mt-4 hidden gap-3 lg:flex'>
              {
                galleryImages.map( ( img, idx ) => (
                  <button
                    className={
                      `relative aspect-square w-20 overflow-hidden rounded-xl border-2 transition-all ${
                        idx === currentImageIndex
                          ? 'border-[hsl(var(--gold))]'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`
                    }
                    key={ idx }
                    onClick={
                      () => {
                        setCurrentImageIndex( idx )
                      }
                    }
                    type='button'
                  >
                    <Image
                      alt={ `${ product.title } view ${ idx + 1 }` }
                      className='object-cover'
                      fill
                      sizes='80px'
                      src={ img }
                    />
                  </button>
                ) )
              }
            </div>
          </div>

          {/* Product Info */}
          <div className='px-4 pt-6 lg:px-0 lg:pt-0'>
            {/* Brand */}
            <p className='text-sm font-medium uppercase tracking-wider text-[hsl(var(--gold))]'>
              {product.brand}
            </p>

            {/* Title */}
            <h1 className='mt-2 font-serif text-2xl font-semibold text-white lg:text-3xl'>
              {product.title}
            </h1>

            {/* Price */}
            <div className='mt-4 flex items-baseline gap-3'>
              <span className='text-3xl font-bold text-[hsl(var(--gold))] lg:text-4xl'>
                {product.price} zł
              </span>
              {
                product.originalPrice
                  ? (
                    <span className='text-xl text-muted-foreground line-through'>
                      {product.originalPrice} zł
                    </span>
                  )
                  : null
              }
            </div>

            {/* Condition & Date */}
            <div className='mt-4 flex items-center gap-4'>
              <div className='flex items-center gap-1.5'>
                <div className='flex h-5 w-5 items-center justify-center rounded-full bg-green-500/20'>
                  <Check className='h-3 w-3 text-green-400' />
                </div>
                <span className='text-sm text-muted-foreground'>
                  {
                    product.discount && 50 < product.discount
                      ? 'Very good condition'
                      : 'Good condition'
                  }
                </span>
              </div>
              <span className='text-sm text-muted-foreground'>
                Listed {formatDate( product.lastUpdated )}
              </span>
            </div>

            {/* Size Selection */}
            <div className='mt-6'>
              <div className='mb-3 flex items-center justify-between'>
                <span className='font-medium text-white'>Size</span>
                <button className='text-sm text-[hsl(var(--gold))] underline-offset-2 hover:underline' type='button'>
                  Size guide
                </button>
              </div>
              <div className='flex flex-wrap gap-2'>
                {
                  availableSizes.map( ( size ) => (
                    <button
                      className={
                        `min-w-[3rem] rounded-lg border px-4 py-2.5 text-sm font-medium transition-all ${
                          size === selectedSize
                            ? 'border-[hsl(var(--gold))] bg-[hsl(var(--gold))]/10 text-[hsl(var(--gold))]'
                            : size === product.size
                              ? 'border-white/30 text-white hover:border-white/50'
                              : 'border-white/10 text-muted-foreground opacity-50'
                        }`
                      }
                      disabled={ size !== product.size }
                      key={ size }
                      onClick={
                        () => {
                          setSelectedSize( size )
                        }
                      }
                      type='button'
                    >
                      {size}
                    </button>
                  ) )
                }
              </div>
              <p className='mt-2 text-xs text-muted-foreground'>
                Only size {product.size} available
              </p>
            </div>

            {/* Seller Info */}
            <div className='mt-6 rounded-2xl border border-white/10 bg-white/5 p-4'>
              <div className='flex items-center gap-3'>
                <div className='flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[hsl(var(--gold))] to-[hsl(var(--gold-dark))]'>
                  <span className='text-lg font-bold text-black'>
                    {product.brand.charAt( 0 )}
                  </span>
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-white'>Fashion Lover</p>
                  <div className='flex items-center gap-2'>
                    <div className='flex items-center gap-0.5'>
                      {
                        [ 1, 2, 3, 4, 5 ].map( ( star ) => (
                          <Star
                            className={ `h-3.5 w-3.5 ${ 4 >= star ? 'fill-[hsl(var(--gold))] text-[hsl(var(--gold))]' : 'text-muted-foreground' }` }
                            key={ star }
                          />
                        ) )
                      }
                    </div>
                    <span className='text-sm text-muted-foreground'>(127 reviews)</span>
                  </div>
                </div>
                <button
                  className='flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors hover:bg-white/5'
                  type='button'
                >
                  <MessageCircle className='h-5 w-5 text-white' />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className='mt-6 grid grid-cols-2 gap-3'>
              <div className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3'>
                <Shield className='h-5 w-5 text-[hsl(var(--gold))]' />
                <div>
                  <p className='text-sm font-medium text-white'>Buyer Protection</p>
                  <p className='text-xs text-muted-foreground'>Full refund if item not received</p>
                </div>
              </div>
              <div className='flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3'>
                <Truck className='h-5 w-5 text-[hsl(var(--gold))]' />
                <div>
                  <p className='text-sm font-medium text-white'>Fast Shipping</p>
                  <p className='text-xs text-muted-foreground'>Usually ships in 1-2 days</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className='mt-6'>
              <h3 className='mb-2 font-medium text-white'>Description</h3>
              <p className='leading-relaxed text-muted-foreground'>
                Beautiful {product.title.toLowerCase()} from {product.brand}.
                This item is in {product.discount && 50 < product.discount ? 'very good' : 'good'} condition.
                Size {product.size}, perfect for any occasion.
                Worn only a few times, no visible wear or damage.
              </p>
            </div>

            {/* Desktop Action Buttons */}
            <div className='mt-8 hidden gap-4 lg:flex'>
              <button className='btn-elegant flex-1 py-4 text-lg' type='button'>
                Buy Now
              </button>
              <button className='btn-outline flex-1 py-4 text-lg' type='button'>
                Make Offer
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {
          0 < relatedProducts.length
            ? (
              <section className='mt-12 px-4 lg:mt-16 lg:px-0'>
                <h2 className='mb-6 font-serif text-xl font-semibold text-white'>
                  You might also like
                </h2>
                <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
                  {
                    relatedProducts.slice( 0, 4 )
                      .map( ( related ) => (
                        <Link
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
                                  <div className='absolute end-2 top-2 rounded-full bg-[hsl(var(--rose))] px-2 py-0.5 text-xs font-bold text-white'>
                                    -{related.discount}%
                                  </div>
                                )
                                : null
                            }
                          </div>
                          <div className='mt-3'>
                            <div className='flex items-baseline gap-2'>
                              <span className='font-bold text-[hsl(var(--gold))]'>
                                {related.price} zł
                              </span>
                              {
                                related.originalPrice
                                  ? (
                                    <span className='text-sm text-muted-foreground line-through'>
                                      {related.originalPrice} zł
                                    </span>
                                  )
                                  : null
                              }
                            </div>
                            <p className='mt-1 line-clamp-1 text-sm text-muted-foreground'>
                              {related.brand}
                            </p>
                          </div>
                        </Link>
                      ) )
                  }
                </div>
              </section>
            )
            : null
        }
      </div>

      {/* Mobile Fixed Bottom Bar */}
      <div className='fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-background/95 p-4 backdrop-blur-xl lg:hidden'>
        <div className='flex gap-3'>
          <button className='btn-elegant flex-1 py-3.5' type='button'>
            Buy Now - {product.price} zł
          </button>
          <button className='btn-outline px-6 py-3.5' type='button'>
            Offer
          </button>
        </div>
      </div>

      {/* Bottom Navigation - Mobile only (behind the action bar) */}
      <div className='hidden'>
        <BottomNavigation activeItem='home' />
      </div>
    </div>
  )
}
