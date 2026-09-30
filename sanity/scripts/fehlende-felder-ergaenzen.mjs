/**
 * Ergaenzt fehlende Felder im Dokument «praxis».
 *
 * Anlass: wer das Studio oeffnet, erzeugt damit einen Entwurf — eine Kopie des
 * damaligen Standes. Wird dieser Entwurf spaeter veroeffentlicht, ueberschreibt
 * er das Dokument mit genau jenem Stand. Alles, was in der Zwischenzeit von
 * aussen (etwa durch ein Skript) hinzugefuegt wurde, geht dabei verloren.
 *
 * Dieses Skript setzt deshalb ausschliesslich Felder, die aktuell fehlen
 * (setIfMissing). Was im Studio bearbeitet wurde, bleibt unberuehrt. Es laesst
 * sich gefahrlos beliebig oft ausfuehren.
 *
 * Bilder werden ueber den Dateinamen in der Mediathek wiedergefunden, es wird
 * nichts erneut hochgeladen.
 *
 * Aufruf:  SANITY_AUTH_TOKEN=… node scripts/fehlende-felder-ergaenzen.mjs
 */
import {createClient} from '@sanity/client'

const client = createClient({
  projectId: 'pe3xnnex',
  dataset: 'production',
  apiVersion: '2026-08-10',
  token: process.env.SANITY_AUTH_TOKEN || process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
})

const de = (text) => ({de: text})

/** Vollstaendiger Sollstand der Felder, die nicht redaktionell entstehen. */
const soll = {
  // Reihenfolge wie im gestalterischen Entwurf.
  navigation: [
    {_key: 'team', anker: '#team', titel: de('Team')},
    {_key: 'angebot', anker: '#angebot', titel: de('Angebot')},
    {_key: 'zeiten', anker: '#sprechzeiten', titel: de('Sprechzeiten')},
    {_key: 'notfall', anker: '#notfall', titel: de('Notfall')},
    {_key: 'kontakt', anker: '#kontakt', titel: de('Kontakt')},
  ],
  teamLabel: de('Das Team'),
  zeitenLabel: de('Öffnungszeiten'),
  ferienTitel: de('Betriebsferien'),
  notfallListeLabel: de('Weitere wichtige Anlaufstellen'),
  kontaktTitel: de('Kontakt & Anfahrt'),
  sprachenLabel: de('Sprachen:'),
  mailLabel: de('Sichere E-Mail:'),
  karteKnopf: de('Route in Google Maps öffnen'),
  mehrLabel: de('Mehr lesen +'),
  wenigerLabel: de('Weniger lesen −'),
  footerPraxis: de('Praxis'),
  footerRechtliches: de('Rechtliches'),
  footerImpressum: de('Impressum'),
  footerDatenschutz: de('Datenschutzerklärung'),
  fehlerTitel: de('Diese Seite gibt es nicht'),
  fehlerText: de(
    'Vielleicht hat sich ein Tippfehler in die Adresse eingeschlichen, oder die Seite wurde verschoben. Das ist nicht weiter schlimm — hier geht es weiter:',
  ),
  fehlerLinks: [
    {_key: 'start', ziel: '/', titel: de('Zur Startseite')},
    {_key: 'zeiten', ziel: '/#sprechzeiten', titel: de('Sprechzeiten und Terminvereinbarung')},
    {_key: 'angebot', ziel: '/#angebot', titel: de('Unser Angebot')},
    {_key: 'kontakt', ziel: '/#kontakt', titel: de('Kontakt und Anfahrt')},
  ],
  fehlerTelefonTitel: de('Sie erreichen uns telefonisch'),
  fehlerTelefonText: de(
    'Am schnellsten kommen Sie zu einer Antwort, wenn Sie uns während der Öffnungszeiten anrufen.',
  ),
  fehlerNotfallText: de(
    '**Im Notfall:** Bei lebensbedrohlichen Notfällen wählen Sie bitte sofort 144. Ausserhalb unserer Öffnungszeiten erreichen Sie den regionalen ärztlichen Notfalldienst unter 0900 008 008 (CHF 3.23/Min.).',
  ),
}

/** Feld → Dateiname in der Mediathek. */
const bilder = {
  heroBild: {datei: 'zugersee-cham.jpg', alt: 'Blick über den Zugersee auf Cham'},
  sprechzeitenBild: {
    datei: 'praxisteam.jpg',
    alt: 'Das Praxisteam der Arztpraxis am Dorfplatz',
  },
  ctaBildLinks: {datei: 'cta-zugersee.jpg'},
  ctaBildRechts: {datei: 'cta-seeufer.jpg'},
}

const portraits = {
  praxis: {feld: 'arztPortrait', datei: 'portrait-fiechtner.jpg', alt: 'Dr. med. Natalia Fiechtner'},
  'team-romy-banz': {feld: 'portrait', datei: 'portrait-banz.jpg', alt: 'Romy Banz'},
  'team-pascale-gamma': {feld: 'portrait', datei: 'portrait-gamma.jpg', alt: 'Pascale Gamma'},
  'team-oleksandra-matvieieva': {
    feld: 'portrait',
    datei: 'portrait-matvieieva.jpg',
    alt: 'Oleksandra Matvieieva',
  },
}

async function main() {
  const entwurf = await client.fetch('*[_id == "drafts.praxis"][0]._id')
  if (entwurf) {
    console.error(
      'Es existiert ein unveroeffentlichter Entwurf. Bitte im Studio erst\n' +
        'veroeffentlichen oder verwerfen — sonst ueberschreibt er die Ergaenzung.',
    )
    process.exit(1)
  }

  const dokument = (await client.fetch('*[_id == "praxis"][0]')) || {}
  const mediathek = await client.fetch(
    '*[_type == "sanity.imageAsset"]{_id, originalFilename}',
  )
  const nachDatei = Object.fromEntries(mediathek.map((a) => [a.originalFilename, a._id]))

  // --- Textfelder
  const fehlend = Object.fromEntries(
    Object.entries(soll).filter(([schluessel]) => dokument[schluessel] === undefined),
  )

  // --- Bilder der Startseite
  for (const [feld, angabe] of Object.entries(bilder)) {
    if (dokument[feld] !== undefined) continue
    const asset = nachDatei[angabe.datei]
    if (!asset) {
      console.log(`— ${angabe.datei} nicht in der Mediathek, uebersprungen`)
      continue
    }
    fehlend[feld] = {
      _type: 'image',
      asset: {_type: 'reference', _ref: asset},
      ...(angabe.alt ? {alt: angabe.alt} : {}),
    }
  }

  if (Object.keys(fehlend).length === 0) {
    console.log('Nichts zu ergaenzen — alle Felder sind vorhanden.')
  } else {
    await client.patch('praxis').setIfMissing(fehlend).commit()
    console.log(`✓ ${Object.keys(fehlend).length} Felder ergaenzt:`)
    console.log('  ' + Object.keys(fehlend).join(', '))
  }

  // --- Portraets (auch die Team-Dokumente koennen betroffen sein)
  for (const [id, angabe] of Object.entries(portraits)) {
    const vorhanden = await client.fetch(`*[_id == $id][0].${angabe.feld}`, {id})
    if (vorhanden) continue
    const asset = nachDatei[angabe.datei]
    if (!asset) continue
    await client
      .patch(id)
      .set({
        [angabe.feld]: {
          _type: 'image',
          asset: {_type: 'reference', _ref: asset},
          alt: angabe.alt,
        },
      })
      .commit()
    console.log(`✓ Porträt wiederhergestellt: ${id}`)
  }
}

main().catch((fehler) => {
  console.error(fehler.message)
  process.exit(1)
})
