/**
 * Portraets aus dem Entwurf nach Sanity hochladen. Danach werden Bilder im
 * Studio gepflegt — dieses Skript ist nur fuer die Erstbefuellung gedacht.
 */
import {createClient} from '@sanity/client'
import {createReadStream, existsSync} from 'node:fs'

const client = createClient({
  projectId: 'pe3xnnex',
  dataset: 'production',
  apiVersion: '2026-08-10',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// Ordner mit den Originalbildern (liegt nicht im Repository)
const QUELLE = process.env.QUELLE ?? '../Юай референсы /images'

const bilder = [
  {datei: 'portrait-fiechtner.jpg', ziel: 'praxis', feld: 'arztPortrait', alt: 'Dr. med. Natalia Fiechtner'},
  {datei: 'portrait-banz.jpg', ziel: 'team-romy-banz', feld: 'portrait', alt: 'Romy Banz'},
  {datei: 'portrait-gamma.jpg', ziel: 'team-pascale-gamma', feld: 'portrait', alt: 'Pascale Gamma'},
  {datei: 'portrait-matvieieva.jpg', ziel: 'team-oleksandra-matvieieva', feld: 'portrait', alt: 'Oleksandra Matvieieva'},
]

for (const b of bilder) {
  const pfad = `${QUELLE}/${b.datei}`
  if (!existsSync(pfad)) {
    console.log(`— fehlt, uebersprungen: ${b.datei}`)
    continue
  }
  const asset = await client.assets.upload('image', createReadStream(pfad), {filename: b.datei})
  await client
    .patch(b.ziel)
    .set({[b.feld]: {_type: 'image', asset: {_type: 'reference', _ref: asset._id}, alt: b.alt}})
    .commit()
  console.log(`✓ ${b.datei} → ${b.ziel}`)
}
