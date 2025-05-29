// storage-adapter-import-placeholder
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Blog } from './collections/Blog'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

console.log('DATABASE_URI:', process.env.DATABASE_URI ? 'SET' : 'NOT SET')
console.log('DATABASE_AUTH_TOKEN:', process.env.DATABASE_AUTH_TOKEN ? 'SET' : 'NOT SET')
console.log('PAYLOAD_SECRET:', process.env.PAYLOAD_SECRET ? 'SET' : 'NOT SET')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Blog],
  editor: lexicalEditor(),
  secret:
    process.env.PAYLOAD_SECRET ||
    'f6ac3c3ec2bedbc906e5be393d22dd37e266305c68a1ef51cdacff8cf828fc4b0c7947cb1e26ded0e2761893547abde99543cfce0444f5e90a47b49b8f1aadd3',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI || '',
      authToken: process.env.DATABASE_AUTH_TOKEN || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
