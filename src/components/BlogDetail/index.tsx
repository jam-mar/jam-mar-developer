/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { CalendarDays, ArrowLeft, Clock } from 'lucide-react'
import { Blog } from '@/payload-types'
import { JSX } from 'react'

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

  const getReadingTime = (content: any) => {
    // Simple reading time calculation (assuming 200 words per minute)
    if (!content || !content.root || !content.root.children) return 1

    let wordCount = 0

    const countWords = (children: any[]) => {
      children?.forEach((child: any) => {
        if (child.type === 'text' && child.text) {
          wordCount += child.text
            .split(/\s+/)
            .filter((word: string | any[]) => word.length > 0).length
        }
        if (child.children) {
          countWords(child.children)
        }
      })
    }

    content.root.children.forEach((node: any) => {
      if (node.children) {
        countWords(node.children)
      }
    })

    return Math.max(1, Math.ceil(wordCount / 200))
  }

  // Function to render inline content (text, links, formatting)
  const renderInlineContent = (children: any[]) => {
    return children?.map((child: any, childIndex: number) => {
      if (child.type === 'text') {
        // Handle text formatting (bold, italic, etc.)
        let textElement = <span key={childIndex}>{child.text}</span>

        if (child.format === 2) {
          // Bold
          textElement = <strong key={childIndex}>{child.text}</strong>
        } else if (child.format === 1) {
          // Italic
          textElement = <em key={childIndex}>{child.text}</em>
        }

        return textElement
      } else if (child.type === 'autolink') {
        // Handle embedded links
        const url = child.fields?.url || '#'
        const linkText = child.children?.[0]?.text || url

        // Check if it's an external link or internal
        const isExternal = url.startsWith('http://') || url.startsWith('https://')

        if (isExternal) {
          return (
            <a
              key={childIndex}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {linkText}
            </a>
          )
        } else {
          // Internal link - use Next.js Link
          return (
            <Link key={childIndex} href={url} className="text-primary hover:underline">
              {linkText}
            </Link>
          )
        }
      }
      return null
    })
  }

  // Enhanced function to render rich text content
  const renderContent = (content: any) => {
    if (!content) return null

    // Handle Lexical editor content
    if (content.root && content.root.children) {
      return (
        <div className="prose prose-lg max-w-none">
          {content.root.children.map((node: any, index: number) => {
            switch (node.type) {
              case 'heading':
                const HeadingTag = node.tag as keyof JSX.IntrinsicElements
                return (
                  <HeadingTag key={index} className="font-bold mt-8 mb-4">
                    {renderInlineContent(node.children)}
                  </HeadingTag>
                )

              case 'paragraph':
                // Skip empty paragraphs
                if (!node.children || node.children.length === 0) {
                  return <div key={index} className="h-4" /> // Empty space
                }

                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {renderInlineContent(node.children)}
                  </p>
                )

              case 'list':
                const ListTag = node.listType === 'number' ? 'ol' : 'ul'
                return (
                  <ListTag key={index} className="mb-4 ml-6">
                    {node.children?.map((listItem: any, itemIndex: number) => (
                      <li key={itemIndex} className="mb-2">
                        {renderInlineContent(listItem.children)}
                      </li>
                    ))}
                  </ListTag>
                )

              case 'quote':
                return (
                  <blockquote key={index} className="border-l-4 border-primary pl-4 italic my-6">
                    {renderInlineContent(node.children)}
                  </blockquote>
                )

              default:
                // Fallback for unknown node types
                if (node.children) {
                  return (
                    <div key={index} className="mb-4">
                      {renderInlineContent(node.children)}
                    </div>
                  )
                }
                return null
            }
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

      {/* Header */}
      <header className="mb-8">
        {/* Meta information */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <time dateTime={post.publishedAt || post.createdAt}>
              {formatDate(post.publishedAt || post.createdAt)}
            </time>
          </div>
          {/* Added reading time display */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{getReadingTime(post.content)} min read</span>
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
