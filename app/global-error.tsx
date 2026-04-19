'use client'

export default function GlobalError( {
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
} ) {
  return (
    <html>
      <body className='bg-background text-foreground'>
        <main className='flex min-h-screen items-center justify-center px-6 py-16'>
          <div className='glass-card w-full max-w-xl rounded-3xl p-8 text-center lg:p-12'>
            <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]'>
              Something went wrong
            </p>
            <h1 className='mt-4 font-serif text-3xl font-semibold lg:text-4xl'>
              The page could not be rendered
            </h1>
            <p className='mt-4 text-base leading-relaxed text-muted-foreground'>
              {error.message || 'An unexpected error occurred while loading this page.'}
            </p>
            <button
              className='mt-6 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90'
              onClick={ reset }
              type='button'
            >
              Try again
            </button>
          </div>
        </main>
      </body>
    </html>
  )
}
