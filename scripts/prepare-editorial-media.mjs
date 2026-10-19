import sharp from 'sharp'
import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'

const pairs = [
  ['6.56.28 PM', 'conference-portrait'],
  ['6.56.29 PM (1)', 'dialogue-portrait-a'],
  ['6.56.29 PM', 'dialogue-portrait-b'],
  ['6.56.30 PM (1)', 'dialogue-portrait-c'],
  ['6.56.30 PM (2)', 'dialogue-portrait-d'],
  ['6.56.30 PM', 'dialogue-portrait-e'],
  ['6.56.31 PM (1)', 'dhaka-dialogue-backdrop'],
  ['6.56.31 PM', 'dhaka-dialogue-conversation'],
  ['6.56.32 PM', 'bay-of-bengal-2026'],
  ['6.56.33 PM (1)', 'courtesy-group'],
  ['6.56.33 PM (2)', 'courtesy-office'],
  ['6.56.33 PM', 'courtesy-portrait'],
  ['6.56.34 PM (1)', 'doctors-backdrop'],
  ['6.56.34 PM (2)', 'public-flag'],
  ['6.56.34 PM', 'doctors-gathering'],
  ['6.56.35 PM', 'public-placard'],
]
const output = 'frontend/public/media/new'
await mkdir(output, { recursive: true })
const manifest = []
for (const [time, name] of pairs) {
  const source = path.join('New images', `WhatsApp Image 2026-10-17 at ${time}.jpeg`)
  const destination = path.join(output, `${name}.webp`)
  await sharp(source)
    .rotate()
    .resize({ width: 1600, height: 1600, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(destination)
  manifest.push({
    source,
    derivative: destination,
    originalBytes: (await stat(source)).size,
    derivativeBytes: (await stat(destination)).size,
  })
}
await mkdir('docs', { recursive: true })
await writeFile('docs/media-manifest.json', JSON.stringify(manifest, null, 2) + '\n')
console.log(`Prepared ${manifest.length} web images; originals preserved.`)
