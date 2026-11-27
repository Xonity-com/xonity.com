/**
 * Post-build step for static hosts with no rewrite rules — GitHub Pages above
 * all. Pages serves 404.html for any unknown path, so shipping a copy of the
 * app there turns every deep link into a working client-side route.
 *
 * Also drops .nojekyll, without which Pages runs Jekyll and strips paths
 * beginning with an underscore.
 */
import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const dist = join(process.cwd(), 'dist')
const index = join(dist, 'index.html')

if (!existsSync(index)) {
  console.error('spa-fallback: dist/index.html not found — run the build first.')
  process.exit(1)
}

copyFileSync(index, join(dist, '404.html'))
writeFileSync(join(dist, '.nojekyll'), '')
console.log('spa-fallback: wrote dist/404.html and dist/.nojekyll')
