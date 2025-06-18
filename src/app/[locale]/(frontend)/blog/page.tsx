import { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import NavBar from '@/components/NavBar'
import BlogList from '@/components/BlogList'
import { getCachedPayload } from '@/lib/payload'

// Enable static generation with revalidation
export const revalidate = 3600 // Revalidate every hour

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })

  return {
    title: t('title'),
    description: t('subtitle'),
  }
}

interface BlogPageProps {
  params: Promise<{
    locale: string
  }>
}

export default async function BlogPage({}: BlogPageProps) {
  try {
    const payload = await getCachedPayload()

    const { docs: posts } = await payload.find({
      collection: 'posts',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      depth: 1,
      limit: 50,
    })

    return (
      <div className="min-h-screen bg-background">
        <NavBar scrollBehavior={true} />
        <main className="pt-16">
          <BlogList posts={posts || []} />
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog posts:', error)

    return (
      <div className="min-h-screen bg-background">
        <NavBar scrollBehavior={true} />
        <main className="pt-16">
          <BlogList posts={[]} />
        </main>
      </div>
    )
  }
}
