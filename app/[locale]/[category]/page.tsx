import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

interface CategoryPageProps {
  params: Promise<{
    category : string
    locale   : string
  }>
}

export default async function CategoryPage( { params }: CategoryPageProps ) {
  const { locale } = await params

  setRequestLocale( locale )
  notFound()
}
export async function generateStaticParams() {
  return []
}
