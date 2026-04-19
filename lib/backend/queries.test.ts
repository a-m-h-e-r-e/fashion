import { describe, expect, test, vi } from 'vitest'
import {
  BRANCH_STOCK_PAGE_SIZE,
  getBranchVariantStock,
} from './queries'

describe( 'getBranchVariantStock', () => {
  test( 'fetches all RPC pages for large branch stock sets', async () => {
    const firstPage = Array.from( { length: BRANCH_STOCK_PAGE_SIZE }, ( _, index ) => ( {
      product_id : `prod-${ index }`,
      quantity   : 1,
      sku        : `sku-${ index }`,
    } ) )
    const secondPage = [
      {
        product_id : 'H4',
        quantity   : 1,
        sku        : '1123',
      },
      {
        product_id : 'H3',
        quantity   : 1,
        sku        : '1077',
      },
      {
        product_id : 'H2',
        quantity   : 1,
        sku        : '1018',
      },
    ]
    const range = vi.fn( async ( from: number ) => ( {
      data  : 0 === from ? firstPage : secondPage,
      error : null,
    } ) )
    const rpc = vi.fn( () => ( { range } ) )
    const client = { rpc } as unknown as Parameters<typeof getBranchVariantStock>[0]

    const rows = await getBranchVariantStock( client, 'Hayahulet' )

    expect( rpc )
      .toHaveBeenCalledTimes( 2 )
    expect( range )
      .toHaveBeenNthCalledWith( 1, 0, BRANCH_STOCK_PAGE_SIZE - 1 )
    expect( range )
      .toHaveBeenNthCalledWith( 2, BRANCH_STOCK_PAGE_SIZE, BRANCH_STOCK_PAGE_SIZE * 2 - 1 )
    expect( rows )
      .toHaveLength( BRANCH_STOCK_PAGE_SIZE + secondPage.length )
    expect( rows.slice( -3 ) )
      .toEqual( secondPage )
  } )
} )
