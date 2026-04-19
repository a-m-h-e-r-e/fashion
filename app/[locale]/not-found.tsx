export default function NotFoundPage() {
  return (
    <main className='noise-overlay flex min-h-screen items-center justify-center px-6 py-16'>
      <div className='glass-card w-full max-w-xl rounded-3xl p-8 text-center lg:p-12'>
        <p className='text-sm font-semibold uppercase tracking-[0.3em] text-[hsl(var(--gold))]'>
          404
        </p>
        <h1 className='mt-4 font-serif text-3xl font-semibold text-white lg:text-4xl'>
          Page not available
        </h1>
        <p className='mt-4 text-base leading-relaxed text-muted-foreground'>
          Only product detail pages are enabled right now.
        </p>
      </div>
    </main>
  )
}
