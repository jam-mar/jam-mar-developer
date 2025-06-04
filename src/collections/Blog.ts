import type { CollectionConfig } from 'payload'

export const Blog: CollectionConfig = {
  slug: 'blog',
  labels: {
    singular: 'Blog Post',
    plural: 'Blog Posts',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedAt', 'readingTime'],
  },
  access: {
    read: () => true, // Public read access
    create: ({ req: { user } }) => !!user, // Only authenticated users can create
    update: ({ req: { user } }) => !!user, // Only authenticated users can update
    delete: ({ req: { user } }) => !!user, // Only authenticated users can delete
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'URL-friendly version of the title (e.g., "my-first-post")',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      maxLength: 300,
      admin: {
        description: 'Short description for blog previews',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Main image for the blog post',
      },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      defaultValue: 'draft',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        description: 'When this post was published',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
      hooks: {
        beforeChange: [
          ({ value, originalDoc, data }) => {
            // Auto-set publishedAt when status changes to published
            if (data?.status === 'published' && !value && originalDoc?.status !== 'published') {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      required: true,
      min: 1,
      max: 60,
      admin: {
        description: 'Estimated reading time in minutes',
      },
      hooks: {
        beforeChange: [
          ({ value, data }) => {
            // Auto-calculate if not provided
            if (!value && data?.content) {
              // Simple calculation: ~200 words per minute
              const contentText = JSON.stringify(data.content).replace(/<[^>]*>/g, ' ')
              const wordCount = contentText.split(/\s+/).filter((word) => word.length > 0).length
              return Math.max(1, Math.ceil(wordCount / 200))
            }
            return value
          },
        ],
      },
    },
  ],
  timestamps: true,
}
