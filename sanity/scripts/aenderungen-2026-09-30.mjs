/**
 * Aenderungen vom 30.09.2026 (Wunsch Dr. Fiechtner):
 *  - Hero-Bild: Zugersee -> Fassade/Eingang Dorfplatz 2 (16:9-Ausschnitt aus
 *    photo/fassade-dorfplatz-2-original.jpg)
 *  - Patientenbrief: Satz ueber Dr. Matter entfernt (DE + RU)
 *
 * Bricht ab, wenn im Studio ein Entwurf offen ist (sonst ueberschreibt ein
 * spaeteres Publish diese Aenderungen, siehe СОСТОЯНИЕ.md).
 */
import {createClient} from '@sanity/client'
import {createReadStream} from 'node:fs'

const client = createClient({
  projectId: 'pe3xnnex',
  dataset: 'production',
  apiVersion: '2026-08-10',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
})

// Pfad zum Hero-Foto (liegt nicht im Repository), z. B. BILD=../photo/fassade-eingang-hero.jpg
const BILD = process.env.BILD ?? '../photo/fassade-eingang-hero.jpg'

if (await client.getDocument('drafts.praxis')) {
  console.error('Entwurf drafts.praxis offen - erst im Studio publizieren oder verwerfen.')
  process.exit(1)
}

// Aufruf: --hero (Bild + Brief, bereits ausgefuehrt) und/oder --absage
if (process.argv.includes('--hero')) {
const asset = await client.assets.upload('image', createReadStream(BILD), {
  filename: 'fassade-eingang-dorfplatz-2.jpg',
})

await client
  .patch('praxis')
  .set({
    heroBild: {
      _type: 'image',
      alt: 'Eingang der Arztpraxis am Dorfplatz 2 in Cham',
      asset: {_type: 'reference', _ref: asset._id},
    },
    'briefEinleitung.de':
      'Eine Hausarztpraxis lebt von Vertrauen. Darum nehme ich mir Zeit für Ihre Anliegen, arbeite sorgfältig und habe ein offenes Ohr – auch für das, was zwischen den Zeilen steht.',
    'briefEinleitung.ru':
      'Работа семейного врача держится на доверии. Поэтому я уделяю время Вашим вопросам, внимательно отношусь к медицине и слышу не только сказанное, но и то, что стоит между строк.',
  })
  .commit()

console.log('OK, Hero-Bild:', asset._id)
}

// Nachtrag 30.09.2026: Absageregelung — nicht oder zu spaet abgesagte Termine werden verrechnet
// (Bestaetigung Dr. Fiechtner). Wird im Abschnitt Sprechzeiten direkt nach sprechzeitenText gezeigt.
if (process.argv.includes('--absage')) {
  await client
    .patch('praxis')
    .set({
      absageregelung: {
        _type: 'localizedText',
        de: 'Nicht oder weniger als 24 Stunden im Voraus abgesagte Termine werden in Rechnung gestellt.',
        ru: 'За приём, который не был отменён или был отменён менее чем за 24 часа, выставляется счёт.',
      },
    })
    .commit()
  console.log('OK, Absageregelung gesetzt')
}
