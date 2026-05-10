import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import sharp from 'sharp'
import { buildConfig } from 'payload'

import { collections } from './src/payload/collections'
import { globals } from './src/payload/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const requestedDriver = process.env.PAYLOAD_DB_DRIVER || (process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite')
const sqliteUrl = `file:${path.resolve(dirname, './payload-local.db')}`
const postgresUrl = process.env.DATABASE_URL || ''
const s3StorageEnabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

const db =
  requestedDriver === 'postgres'
    ? postgresAdapter({
        pool: {
          connectionString: postgresUrl,
        },
      })
    : sqliteAdapter({
        client: {
          url: process.env.SQLITE_DATABASE_URL || sqliteUrl,
        },
        wal: true,
      })

const plugins = s3StorageEnabled
  ? [
      s3Storage({
        collections: {
          media: {
            prefix: process.env.S3_PREFIX || 'media',
          },
        },
        bucket: process.env.S3_BUCKET as string,
        config: {
          credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
          },
          endpoint: process.env.S3_ENDPOINT || undefined,
          forcePathStyle: process.env.S3_FORCE_PATH_STYLE === 'true',
          region: process.env.S3_REGION || 'auto',
        },
      }),
    ]
  : []

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'development-secret',
  serverURL: process.env.BACKEND_PUBLIC_URL || 'http://localhost:4000',
  routes: {
    admin: '/payload',
  },
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, './src/app/(payload)'),
      importMapFile: path.resolve(dirname, './src/app/(payload)/admin/importMap.js'),
    },
    meta: {
      title: 'Dr Hani Payload',
      description: 'Fallback Payload admin for the Dr Hani website.',
    },
  },
  editor: lexicalEditor(),
  db,
  sharp,
  plugins,
  collections,
  globals,
  typescript: {
    outputFile: path.resolve(dirname, './src/payload-types.ts'),
  },
  onInit: async () => {
    if (requestedDriver !== 'postgres') {
      console.info(`Payload development database running on SQLite (${process.env.SQLITE_DATABASE_URL || sqliteUrl}).`)
    }
  },
})
