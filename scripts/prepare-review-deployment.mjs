import fs from 'node:fs/promises'
import path from 'node:path'

// A self-contained frontend bundle for an unlinked visual-review deployment.
// The working monorepo, backend database, credentials and research notes stay local.
const root = process.cwd()
const destination = path.join(root, '.review-deployment')
await fs.mkdir(destination, { recursive: true })
const source = path.join(root, 'frontend')
for (const entry of [
  'src',
  'public',
  'tsconfig.json',
  'next.config.ts',
  'postcss.config.mjs',
  'eslint.config.mjs',
]) {
  await fs.cp(path.join(source, entry), path.join(destination, entry), { recursive: true })
}
await fs.cp(path.join(root, 'shared'), path.join(destination, 'shared'), { recursive: true })
async function rewrite(directory) {
  for (const entry of await fs.readdir(directory, { withFileTypes: true })) {
    const filename = path.join(directory, entry.name)
    if (entry.isDirectory()) await rewrite(filename)
    else if (/\.[cm]?[jt]sx?$/.test(entry.name)) {
      const original = path.join(source, path.relative(destination, filename))
      const text = await fs.readFile(filename, 'utf8')
      const rewritten = text.replace(/from\s+(['"])(\.[^'"]+)\1/g, (match, quote, specifier) => {
        const resolved = path.resolve(path.dirname(original), specifier)
        if (!resolved.startsWith(path.join(root, 'shared') + path.sep)) return match
        const target = path.join(destination, path.relative(root, resolved))
        const relative = path.relative(path.dirname(filename), target).replaceAll(path.sep, '/')
        return `from ${quote}${relative.startsWith('.') ? relative : `./${relative}`}${quote}`
      })
      await fs.writeFile(filename, rewritten)
    }
  }
}
await rewrite(path.join(destination, 'src'))
const manifest = JSON.parse(await fs.readFile(path.join(source, 'package.json'), 'utf8'))
const lock = JSON.parse(await fs.readFile(path.join(root, 'package-lock.json'), 'utf8'))
for (const group of ['dependencies', 'devDependencies'])
  for (const name of Object.keys(manifest[group])) {
    const dependency = lock.packages[`frontend/node_modules/${name}`] || lock.packages[`node_modules/${name}`]
    if (dependency?.version) manifest[group][name] = dependency.version
  }
manifest.name = 'dr-hani-editorial-review'
await fs.writeFile(path.join(destination, 'package.json'), JSON.stringify(manifest, null, 2) + '\n')
await fs.writeFile(
  path.join(destination, 'vercel.json'),
  JSON.stringify(
    {
      framework: 'nextjs',
      env: { SITE_NOINDEX: 'true' },
      build: { env: { SITE_NOINDEX: 'true' } },
      headers: [
        { source: '/(.*)', headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }] },
      ],
    },
    null,
    2,
  ) + '\n',
)
await fs.writeFile(path.join(destination, '.vercelignore'), 'node_modules\n.next\n.env*\n')
console.log('Prepared .review-deployment: frontend, reviewed content and public media; indexing disabled.')
