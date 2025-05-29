import Link from 'next/link'
import Image from 'next/image'
import { useLocale, useTranslations } from 'next-intl'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CalendarDays } from 'lucide-react'
import { Blog } from '@/payload-types'

interface BlogListProps {
  posts: Blog[]
}

export default function BlogList({ posts = [] }: BlogListProps) {
  const locale = useLocale()
  const t = useTranslations()

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
          <p className="text-muted-foreground text-lg">{t('blog.noPosts')}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">{t('blog.title')}</h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t('blog.subtitle')}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {posts.map((post) => (
          <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-shadow">
            {post.featuredImage &&
              typeof post.featuredImage === 'object' &&
              post.featuredImage.url && (
                <div className="relative aspect-video overflow-hidden rounded-t-lg">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}

            <CardHeader className="flex-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <CalendarDays className="h-4 w-4" />
                <time dateTime={post.publishedAt || post.createdAt}>
                  {formatDate(post.publishedAt || post.createdAt)}
                </time>
              </div>

              <CardTitle className="line-clamp-2 hover:text-primary transition-colors">
                <Link href={`/${locale}/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>

              {post.excerpt && (
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              )}
            </CardHeader>

            <CardContent className="pt-0">
              <Link
                href={`/${locale}/blog/${post.slug}`}
                className="inline-flex items-center text-sm font-medium text-primary hover:underline"
              >
                {t('blog.readMore')} →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
