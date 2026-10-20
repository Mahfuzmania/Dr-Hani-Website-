import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { BasePayload } from 'payload'

process.env.PAYLOAD_DB_DRIVER = 'postgres'
const { default: config } = await import('../backend/payload.config')
const payload = await new BasePayload().init({
  config,
  disableDBConnect: true,
  disableOnInit: true,
})
const kit = payload.db.requireDrizzleKit()
const baseline = JSON.parse(
  await readFile(
    'backend/src/migrations/20261020_000000_editorial_publications.json',
    'utf8',
  ),
)
const updated = await kit.generateDrizzleJson(payload.db.schema)
const up = await kit.generateMigration(baseline, updated)
const down = await kit.generateMigration(updated, baseline)
if (
  up.some((statement: string) =>
    /DROP TABLE|DROP COLUMN|TRUNCATE/i.test(statement),
  )
)
  throw new Error('Refusing destructive UP migration')
const filename = path.resolve(
  'backend/src/migrations/20261020_010000_photo_curation',
)
await writeFile(`${filename}.json`, JSON.stringify(updated, null, 2) + '\n')
await writeFile(
  `${filename}.ts`,
  `import { type MigrateUpArgs, type MigrateDownArgs, sql } from '@payloadcms/db-postgres'\n\nexport async function up({ db }: MigrateUpArgs): Promise<void> {\n  await db.execute(sql\`${up.join('\n')}\`)\n}\n\nexport async function down({ db }: MigrateDownArgs): Promise<void> {\n  await db.execute(sql\`${down.join('\n')}\`)\n}\n`,
)
console.log(
  `Generated photo curation migration: ${up.length} additive UP statements, no database connection.`,
)
process.exit(0)
