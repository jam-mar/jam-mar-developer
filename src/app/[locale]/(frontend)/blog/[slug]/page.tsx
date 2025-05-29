import Link from 'next/link'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import BlogDetail from '@/components/BlogDetail'
import NavBar from '@/components/NavBar'

export const revalidate = 3600 // Revalidate every hour

interface BlogDetailPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'blog',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 1,
      limit: 1,
    })

    const post = docs[0]
    if (!post) {
      return { title: 'Post Not Found' }
    }

    return {
      title: post.title,
      description: post.excerpt || 'Read this blog post',
      openGraph: {
        title: post.title,
        description: post.excerpt || 'Read this blog post',
        type: 'article',
        publishedTime: post.publishedAt || post.createdAt,
        images:
          post.featuredImage && typeof post.featuredImage === 'object'
            ? [{ url: post.featuredImage.url || '' }]
            : [],
      },
    }
  } catch (error) {
    return { title: 'Blog Post' }
  }
}

// Generate static params for popular posts
export async function generateStaticParams() {
  try {
    const payload = await getPayload({ config })

    const { docs: posts } = await payload.find({
      collection: 'blog',
      where: { status: { equals: 'published' } },
      limit: 10, // Only generate static pages for first 10 posts
      sort: '-publishedAt',
    })

    return posts.map((post) => ({
      slug: post.slug,
      locale: 'en', // Add your locales here
    }))
  } catch (error) {
    console.warn('Could not generate static params:', error)
    return []
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params

  try {
    const payload = await getPayload({ config })

    const { docs } = await payload.find({
      collection: 'blog',
      where: {
        slug: { equals: slug },
        status: { equals: 'published' },
      },
      depth: 1,
      limit: 1,
    })

    const post = docs[0]

    if (!post) {
      notFound()
    }

    return (
      <div className="min-h-screen bg-background">
        <NavBar scrollBehavior={true} />
        <main className="pt-16">
          <BlogDetail post={post} />
        </main>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)

    return (
      <div className="min-h-screen bg-background">
        <NavBar scrollBehavior={true} />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
              <p className="text-muted-foreground">
                Unable to load blog post. Please try again later.
              </p>
              <Link
                href={`/${locale}/blog`}
                className="text-primary hover:underline mt-4 inline-block"
              >
                Back to Blog
              </Link>
            </div>
          </div>
        </main>
      </div>
    )
  }
}
