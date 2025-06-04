// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blog],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || 'some-incredibly-long-and-secure-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // Simplified database configuration
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: process.env.NODE_ENV === 'development',
  }),

  sharp,

  plugins: [
    ...(process.env.BLOB_READ_WRITE_TOKEN
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: process.env.BLOB_READ_WRITE_TOKEN,
          }),
        ]
      : []),
  ],

  upload: {
    limits: {
      fileSize: 5000000, // 5MB
    },
  },

  cors: [process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'],

  csrf: [process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'],
})
