const formatPriceValue = ( price: number ): string => {
  const hasFraction = !Number.isInteger( price )

  return new Intl.NumberFormat( 'en-US', {
    maximumFractionDigits : hasFraction ? 2 : 0,
    minimumFractionDigits : hasFraction ? 2 : 0,
  } )
    .format( price )
}

export { formatPriceValue }
