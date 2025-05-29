import { Metadata } from 'next'
import { getPayload } from 'payload'
import { getTranslations } from 'next-intl/server'
import config from '@payload-config'
import NavBar from '@/components/NavBar'
import BlogList from '@/components/BlogList'

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
    const payload = await getPayload({ config })

    // Fetch published blog posts
    const { docs: posts } = await payload.find({
      collection: 'blog',
      where: {
        status: {
          equals: 'published',
        },
      },
      sort: '-publishedAt',
      depth: 1, // This will populate the featuredImage relationship
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

    // Fallback when there's an error or no posts
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
