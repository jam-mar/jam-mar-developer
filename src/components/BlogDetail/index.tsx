import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowLeft } from 'lucide-react'
import { Blog } from '@/payload-types'

interface BlogDetailProps {
  post: Blog
}

export default function BlogDetail({ post }: BlogDetailProps) {
  const locale = useLocale()
  const t = useTranslations()

  console.log('BlogDetail received post:', post) // Debug log

  // Handle loading state or missing post
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

  const getReadingTime = (content: any) => {
    // Simple reading time calculation (assuming 200 words per minute)
    if (!content || !content.root || !content.root.children) return 1

    let wordCount = 0
    content.root.children.forEach((node: any) => {
      if (node.children) {
        node.children.forEach((child: any) => {
          if (child.type === 'text' && child.text) {
            wordCount += child.text.split(' ').length
          }
        })
      }
    })

    return Math.max(1, Math.ceil(wordCount / 200))
  }

  // Simple function to render rich text content
  const renderContent = (content: any) => {
    if (!content) return null

    // Handle Lexical editor content
    if (content.root && content.root.children) {
      return (
        <div className="prose prose-lg max-w-none">
          {content.root.children.map((node: any, index: number) => {
            if (node.type === 'paragraph') {
              return (
                <p key={index} className="mb-4">
                  {node.children?.map((child: any, childIndex: number) => {
                    if (child.type === 'text') {
                      return <span key={childIndex}>{child.text}</span>
                    }
                    return null
                  })}
                </p>
              )
            }
            return null
          })}
        </div>
      )
    }

    // Fallback for other content types
    if (typeof content === 'string') {
      return (
        <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
      )
    }

    return (
      <div className="prose prose-lg max-w-none">
        <p>{t('blog.couldNotRender')}</p>
      </div>
    )
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      {/* Back button */}
      <div className="mb-8">
        <Button variant="ghost" asChild className="pl-0">
          <Link href={`/${locale}/blog`} className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            {t('blog.backToBlog')}
          </Link>
        </Button>
      </div>

      {/* Featured image */}
      {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
        <div className="relative aspect-video overflow-hidden rounded-lg mb-8">
          <Image
            src={post.featuredImage.url}
            alt={post.featuredImage.alt || post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            priority
          />
        </div>
      )}

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {post.excerpt && <p className="text-xl text-muted-foreground mb-6">{post.excerpt}</p>}

        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.publishedAt || post.createdAt}>
              {formatDate(post.publishedAt || post.createdAt)}
            </time>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="prose prose-lg max-w-none mb-12">{renderContent(post.content)}</div>

      {/* Footer */}
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
