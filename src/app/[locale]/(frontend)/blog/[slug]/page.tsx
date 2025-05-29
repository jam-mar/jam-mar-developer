import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'
import BlogDetail from '@/components/BlogDetail'
import NavBar from '@/components/NavBar'

// Force dynamic rendering to avoid build-time Payload initialization. There should be a better way to handle this, but for now, this works.
export const dynamic = 'force-dynamic'

interface BlogDetailPageProps {
  params: Promise<{
    locale: string
    slug: string
  }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'blog',
    where: {
      slug: {
        equals: slug,
      },
      status: {
        equals: 'published',
      },
    },
    depth: 1, // This will populate the featuredImage relationship
    limit: 1,
  })

  const post = docs[0]

  if (!post) {
    return {
      title: 'Post Not Found',
    }
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
}

// Generate static params for static generation (optional)
export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const { docs: posts } = await payload.find({
    collection: 'blog',
    where: {
      status: {
        equals: 'published',
      },
    },
    limit: 100,
  })

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { locale, slug } = await params

  try {
    const payload = await getPayload({ config })

    console.log('Fetching blog post with slug:', slug) // Debug log

    const { docs } = await payload.find({
      collection: 'blog',
      where: {
        slug: {
          equals: slug,
        },
        status: {
          equals: 'published',
        },
      },
      depth: 1, // This will populate the featuredImage relationship
      limit: 1,
    })

    console.log('Found docs:', docs.length) // Debug log
    console.log('Post data:', docs[0]) // Debug log

    const post = docs[0]

    if (!post) {
      console.log('No post found, calling notFound()') // Debug log
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

    // Return a fallback instead of notFound for debugging
    return (
      <div className="min-h-screen bg-background">
        <NavBar scrollBehavior={true} />
        <main className="pt-16">
          <div className="container mx-auto px-4 py-16 max-w-4xl">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Error Loading Post</h1>
              <p className="text-muted-foreground">
                Error: {error instanceof Error ? error.message : 'Unknown error'}
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
