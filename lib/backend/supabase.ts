import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'
import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ?? ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() ?? ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ?? ''
const defaultBranchId = process.env.FASHION_DEFAULT_BRANCH_ID?.trim() ?? ''
const useOstockBackend = 'false' !== String( process.env.USE_OSTOCK_BACKEND ?? 'true' )

if ( 0 === supabaseUrl.length || 0 === supabaseAnonKey.length ) {
  throw new Error( 'Missing Supabase env. Expected NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.' )
}

const createServiceClient = (): SupabaseClient | null => {
  if ( 0 === supabaseServiceRoleKey.length ) {
    return null
  }

  return createClient( supabaseUrl, supabaseServiceRoleKey, {
    auth : {
      autoRefreshToken : false,
      persistSession   : false,
    },
  } )
}

/**
 * Direct Supabase client for server-rendered catalog (RSC). Prefers the service role key
 * so listings work without a browser session; avoids cookie/session edge cases.
 */
const getSupabaseForServerCatalog = (): SupabaseClient => {
  const service = createServiceClient()

  if ( service ) {
    return service
  }

  return createClient( supabaseUrl, supabaseAnonKey, {
    auth : {
      autoRefreshToken : false,
      persistSession   : false,
    },
  } )
}

const getServerCatalogContext = (): {
  client        : SupabaseClient
  defaultBranch : string
  isEnabled     : boolean
} => ( {
  client        : getSupabaseForServerCatalog(),
  defaultBranch : defaultBranchId,
  isEnabled     : useOstockBackend,
} )

const getSupabaseServerContext = async (): Promise<{
  client        : SupabaseClient
  defaultBranch : string
  isEnabled     : boolean
  user          : User | null
}> => {
  const cookieStore = cookies()
  const anonClient = createServerClient( supabaseUrl, supabaseAnonKey, {
    cookies : {
      getAll : () => cookieStore.getAll(),
      setAll : ( cookiesToSet ) => {
        for ( const cookie of cookiesToSet ) {
          cookieStore.set( cookie.name, cookie.value, cookie.options )
        }
      },
    },
  } )

  const serviceClient = createServiceClient()
  let user: User | null = null

  try {
    const { data } = await anonClient.auth.getUser()
    const { user: authUser } = data
    user = authUser
  } catch {
    user = null
  }

  return {
    client        : user ? anonClient : serviceClient ?? anonClient,
    defaultBranch : defaultBranchId,
    isEnabled     : useOstockBackend,
    user,
  }
}

export { getServerCatalogContext, getSupabaseServerContext }
