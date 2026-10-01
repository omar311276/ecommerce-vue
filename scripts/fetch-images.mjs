// Downloads the product photos into public/images so the site no longer
// depends on an outside service. Run it once with internet access:
//   npm run images
// Re-running only fetches files that are missing. To use a photo of your own,
// drop a file with the same name into public/images and it will be picked first.
import { mkdir, writeFile, access } from 'node:fs/promises'
import { products } from '../src/data/products.js'

const dir = new URL('../public/images/', import.meta.url)
await mkdir(dir, { recursive: true })

let saved = 0
let failed = 0

for (const p of products) {
  for (let n = 0; n < p.images.length; n++) {
    const file = new URL(`${p.slug}-${n + 1}.jpg`, dir)
    try {
      await access(file)
      continue // already there
    } catch {}

    // skip the local path (first) and the random photo (last)
    const sources = p.images[n].slice(1).filter((u) => !u.includes('picsum.photos'))
    let ok = false
    for (const url of sources) {
      try {
        const res = await fetch(url)
        const type = res.headers.get('content-type') || ''
        if (!res.ok || !type.startsWith('image/')) continue
        await writeFile(file, Buffer.from(await res.arrayBuffer()))
        ok = true
        break
      } catch {}
    }
    if (ok) { saved++; console.log('saved  ', `${p.slug}-${n + 1}.jpg`) }
    else { failed++; console.log('missing', `${p.slug}-${n + 1}.jpg`) }
  }
}

console.log(`\nDone. ${saved} downloaded, ${failed} could not be fetched.`)
