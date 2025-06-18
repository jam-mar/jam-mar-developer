import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowLeft, Clock } from 'lucide-react'
import { Blog } from '@/payload-types'
import { RichText } from '@/components/RichText'
interface BlogDetailProps {
  post: Blog
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const locale = useLocale()
  const t = useTranslations()

  console.log('BlogDetail received post:', post) // Debug log

  if (!post) {
    console.log('Post is null/undefined in BlogDetail') // Debug log
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="text-center">
          <p className="text-muted-foreground">{t('blog.couldNotRender')}</p>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  // Simplified reading time - use the readingTime field from your schema
  const getReadingTime = () => {
    return post.readingTime || 1
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0">
          <Link href={`/${locale}/blog`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </Button>
      </div>

      {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
        <div className="relative w-full h-32 sm:h-40 md:h-48 overflow-hidden rounded-lg mb-8">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 640px, (max-width: 1024px) 768px, 800px"
            priority
          />
        </div>
      )}

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        {post.excerpt && (
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed">{post.excerpt}</p>
        )}

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.publishedAt || post.createdAt}>
              {formatDate(post.publishedAt || post.createdAt)}
            </time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{getReadingTime()} min read</span>
          </div>
        </div>
      </header>

      <div className="prose prose-lg max-w-none mb-12 prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm">
        <RichText data={post.content} />
      </div>

      <footer className="border-t pt-8">
        <div className="flex justify-between items-center">
          <Button variant="outline" asChild>
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('blog.allPosts')}
            </Link>
          </Button>

          <div className="text-sm text-muted-foreground">
            {t('blog.lastUpdated')}: {formatDate(post.updatedAt)}
          </div>
        </div>
      </footer>
    </article>
  )
}
