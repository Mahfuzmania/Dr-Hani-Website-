import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import { buildConfig } from 'payload'

import { collections } from './src/payload/collections'
import { globals } from './src/payload/globals'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const requestedDriver = process.env.PAYLOAD_DB_DRIVER || (process.env.NODE_ENV === 'production' ? 'postgres' : 'sqlite')
const sqliteUrl = `file:${path.resolve(dirname, './payload-local.db')}`
const postgresUrl = process.env.DATABASE_URL || ''

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

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || 'development-secret',
  serverURL: process.env.BACKEND_PUBLIC_URL || 'http://localhost:4000',
  admin: {
    user: 'users',
    importMap: {
      baseDir: path.resolve(dirname, './src/app/(payload)'),
      importMapFile: path.resolve(dirname, './src/app/(payload)/admin/importMap.js'),
    },
    meta: {
      title: 'Dr. Umme Hani CMS',
      description: 'Structured admin for the Dr. Umme Hani website.',
    },
  },
  editor: lexicalEditor(),
  db,
  sharp,
  collections,
  globals,
  typescript: {
    outputFile: path.resolve(dirname, './src/payload-types.ts'),
  },
  onInit: async () => {
    if (requestedDriver !== 'postgres') {
      console.info(`Payload development database running on SQLite (${process.env.SQLITE_DATABASE_URL || sqliteUrl}).`)
    }

    if (process.env.PAYLOAD_SEED_ON_INIT === 'true') {
      console.info('Payload seed mode enabled. Populate globals manually or add a dedicated seed script.')
    }
  },
})
