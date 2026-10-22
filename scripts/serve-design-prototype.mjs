// Standalone, read-only design study. Never serves the repository or CMS files.
import { createServer } from 'node:http'
import { readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const concept = path.join(root, 'docs/design-prototype')
const publicMedia = path.join(root, 'frontend/public/media')
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.png': 'image/png' }
const port = Number(process.env.DESIGN_PROTOTYPE_PORT || 4173)

createServer(async (req, res) => {
  const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname)
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
  res.setHeader('Cache-Control', 'no-store')
  if (pathname === '/robots.txt') { res.end('User-agent: *\nDisallow: /\n'); return }
  const base = pathname.startsWith('/media/') ? publicMedia : concept
  const relative = pathname.startsWith('/media/') ? pathname.slice(7) : pathname === '/' ? 'index.html' : pathname.slice(1)
  const target = path.resolve(base, relative)
  const allowed = !path.relative(base, target).startsWith('..') && !path.isAbsolute(path.relative(base, target))
  if (!allowed || req.method !== 'GET') { res.writeHead(404).end(); return }
  try {
    if (!(await stat(target)).isFile()) throw new Error('Not a file')
    res.setHeader('Content-Type', types[path.extname(target)] || 'application/octet-stream')
    res.end(await readFile(target))
  } catch { res.writeHead(404).end('Not found') }
}).listen(port, '127.0.0.1', () => console.log(`Design study: http://127.0.0.1:${port}\nDirections: signature, portrait, journal. Writing: &view=writing.\nNo production application or CMS changes.`))
