/**
 * Einmaliges Einspielen des bestehenden Seiteninhalts nach Sanity.
 *
 * Bis jetzt standen die Texte im Astro-Code. Damit Frau Fiechtner sie selbst
 * aendern kann, wandern sie hier in das Dokument «praxis». Das Skript ist
 * idempotent: es schreibt immer denselben Stand und laesst sich gefahrlos
 * wiederholen — allerdings ueberschreibt es dabei spaetere Aenderungen im
 * Studio. Nach dem ersten Lauf also nur noch bewusst einsetzen.
 *
 * Aufruf:  node scripts/inhalt-einspielen.mjs
 */
import {createClient} from '@sanity/client'
import {readFileSync, existsSync} from 'node:fs'
import {resolve, dirname} from 'node:path'
import {fileURLToPath} from 'node:url'

const hier = dirname(fileURLToPath(import.meta.url))
const wurzel = resolve(hier, '..')

// .env einlesen, ohne zusaetzliche Abhaengigkeit
for (const datei of ['.env', '.env.local']) {
  const pfad = resolve(wurzel, datei)
  if (!existsSync(pfad)) continue
  for (const zeile of readFileSync(pfad, 'utf8').split('\n')) {
    const treffer = zeile.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/)
    if (treffer) process.env[treffer[1]] ??= treffer[2].replace(/^["']|["']$/g, '')
  }
}

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN
if (!token) {
  console.error('Kein Schreib-Token. Bitte SANITY_WRITE_TOKEN setzen.')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  apiVersion: '2026-08-10',
  token,
  useCdn: false,
})

/** Kurzform: nur Deutsch gefuellt, Russisch bleibt fuer spaeter leer. */
const de = (text) => ({de: text})

const inhalt = {
  // ---------------------------------------------------------- Startseite
  seoTitel: de('Arztpraxis am Dorfplatz — Hausarzt in Cham'),
  seoBeschreibung: de(
    'Hausärztliche Grundversorgung in Cham. Dr. med. Natalia Fiechtner, Dorfplatz 2, 6330 Cham. Telefon 041 780 09 45.',
  ),
  heroTitel: de('Hausärztliche Grundversorgung in Cham'),
  heroText: de(
    'Ruhiger Einstieg in eine Praxis mit langjähriger Tradition. Wir nehmen uns Zeit für Ihre Gesundheit und Ihr Wohlbefinden in einer entspannten, professionellen Umgebung.',
  ),

  // ---------------------------------------------------------- Uebernahme
  uebernahmeAnzeigen: true,
  uebernahmeText: de(
    'Ab 1. September 2026 führt Dr. med. Natalia Fiechtner die Praxis weiter. Standort, Team und Telefonnummer bleiben unverändert.',
  ),

  // ------------------------------------------------------ Patientenbrief
  briefTitel: de('Liebe Patienten – ich freue mich von Herzen auf Sie'),
  briefEinleitung: de(
    'Eine Hausarztpraxis lebt von Vertrauen, und ich weiss, was Dr. Matter und sein Team hier über Jahre aufgebaut haben. Genau daran möchte ich anknüpfen: mit Zeit für Ihre Anliegen, sorgfältiger Medizin und einem offenen Ohr – auch für das, was zwischen den Zeilen steht.',
  ),
  briefAbsaetze: [
    de(
      'Das Wichtigste vorweg: Für Sie bleibt alles vertraut. Das ganze Praxisteam, das Sie kennen, bleibt für Sie da. Sie erreichen uns unter der gewohnten Nummer 041 780 09 45 am gewohnten Ort, und bereits vereinbarte Termine gelten selbstverständlich weiter. Auch Ihre Medikamente erhalten Sie wie bisher direkt bei uns in der Praxis – ohne Umweg über die Apotheke, gleich im Anschluss an Ihre Konsultation.',
    ),
    de(
      'Und es gibt gute Neuigkeiten: Ab September ist die Praxis neu auch am Mittwoch für Sie geöffnet – Sie erhalten also leichter und schneller einen Termin. Zudem erweitere ich unser Angebot um die manuelle Medizin und die Neuraltherapie, zwei bewährte Verfahren in der Behandlung von Schmerzen und Beschwerden des Bewegungsapparats – sprechen Sie mich gerne darauf an.',
    ),
    de(
      'Ich freue mich darauf, Sie persönlich kennenzulernen – ob beim nächsten Kontrolltermin oder einfach, wenn Sie uns brauchen. Zusammen mit dem eingespielten Team bin ich ab dem 1. September für Sie da.',
    ),
  ],

  // -------------------------------------------------------------- Ärztin
  arztName: 'Dr. med. Natalia Fiechtner',
  arztTitel: de('Fachärztin für Allgemeine Innere Medizin'),
  arztBio: de(
    'Zwanzig Jahre klinische und hausärztliche Erfahrung. Stationen: Leipzig, Kantonsspital Winterthur, Universitätsspital Zürich, zuletzt in leitender Funktion in Winterthurer Hausarztpraxen.',
  ),
  arztSprachen: de('Deutsch, Russisch, Ukrainisch.'),

  // ---------------------------------------------------------------- Team
  teamTitel: de('Das Praxisteam, das Sie kennen, bleibt für Sie da.'),

  // ------------------------------------------------------------- Angebot
  angebotTitel: de('Angebot'),
  angebotEinleitung: de(
    'Wir decken das Spektrum der hausärztlichen Grundversorgung ab: von der Abklärung akuter Beschwerden über die Begleitung chronischer Erkrankungen bis zu Vorsorge und Impfberatung. Labor, EKG, Lungenfunktion und konventionelles Röntgen haben wir im Haus. Wenn Sie zu einer Leistung Fragen haben, rufen Sie uns an.',
  ),
  angebotGruppen: [
    {
      _key: 'grundversorgung',
      titel: de('Grundversorgung'),
      punkte: [
        de('Allgemeinmedizinische Abklärungen und Therapie'),
        de('Hausärztliche Betreuung'),
        de('Check-up'),
        de('Tages-Notfalldienst'),
      ],
    },
    {
      _key: 'chronisch',
      titel: de('Chronische Erkrankungen'),
      punkte: [
        de('Diabetesbetreuung und -beratung'),
        de('Begleitung bei der Gewichtsreduktion'),
        de('Eiseninfusionen'),
      ],
    },
    {
      _key: 'vorsorge',
      titel: de('Vorsorge und Beratung'),
      punkte: [
        de('Reise- und Impfberatung inklusive Impfungen (auch Gardasil)'),
        de('Fahrtauglichkeit ab 75'),
        de('Untersuchungen bei Nachtarbeit'),
      ],
    },
    {
      _key: 'diagnostik',
      titel: de('Diagnostik in der Praxis'),
      punkte: [
        de('Labor'),
        de('EKG und 48-Stunden-EKG'),
        de('Lungenfunktion'),
        de('Konventionelles Röntgen'),
      ],
    },
    {
      _key: 'therapien',
      titel: de('Therapien und Eingriffe'),
      punkte: [
        de('Kleinchirurgie'),
        de('Desensibilisierung bei Allergien'),
        de('Manuelle Medizin (neu)'),
        de('Neuraltherapie (neu)'),
      ],
    },
    {
      _key: 'medikamente',
      titel: de('Medikamentenabgabe'),
      punkte: [
        de(
          'Sie erhalten Ihre Medikamente direkt bei uns in der Praxis, im Anschluss an Ihre Konsultation — ohne Umweg über die Apotheke.',
        ),
      ],
    },
  ],

  // -------------------------------------------------------- Sprechzeiten
  sprechzeitenTitel: de('Sprechzeiten und Terminvereinbarung'),
  sprechzeitenText: de(
    'Termine vereinbaren Sie telefonisch unter 041 780 09 45. Sie erreichen uns während der gesamten Öffnungszeiten. Wenn Sie einen Termin nicht wahrnehmen können, melden Sie sich bitte rechtzeitig – so kann die Zeit an andere Patienten vergeben werden.',
  ),
  oeffnungszeiten: [
    {_key: 'mo', tag: 'Montag', zeit: '8.00 – 17.00'},
    {_key: 'di', tag: 'Dienstag', zeit: '8.00 – 16.00'},
    {_key: 'mi', tag: 'Mittwoch', zeit: '8.00 – 16.00'},
    {_key: 'do', tag: 'Donnerstag', zeit: '8.00 – 16.00'},
    {_key: 'fr', tag: 'Freitag', zeit: '8.00 – 17.00'},
  ],
  zeitenHinweis: de('Durchgehend geöffnet, keine Mittagspause.'),
  sprechzeitenNeu: de('Neu ist die Praxis auch am Mittwoch ganztags für Sie da.'),

  // --------------------------------------------------------------- Ferien
  ferienHinweis: de(
    'Während der Betriebsferien wenden Sie sich bitte an den regionalen ärztlichen Notfalldienst.',
  ),

  // -------------------------------------------------------------- Notfall
  notfallTitel: de('Notfälle und Bereitschaftsdienst'),
  notfallText: de(
    'Während unserer Öffnungszeiten erreichen Sie uns unter 041 780 09 45. Wir halten täglich Zeit für dringende Fälle frei. Ausserhalb der Öffnungszeiten wenden Sie sich bitte an die folgenden Stellen.',
  ),
  notfallSofort: de('Bei lebensbedrohlichen Notfällen wählen Sie bitte sofort:'),
  notrufNummer: '144',
  notfallnummern: [
    {
      _key: 'andreasklinik',
      name: 'Hirslanden AndreasKlinik Cham',
      zusatz: de('24-Stunden-Notfallaufnahme'),
      nummer: '041 784 01 44',
    },
    {
      _key: 'kantonsspital',
      name: 'Zuger Kantonsspital, Baar',
      zusatz: de('Notfallstation'),
      nummer: '041 399 11 11',
    },
    {
      _key: 'notfalldienst',
      name: 'Regionaler ärztlicher Notfalldienst',
      zusatz: de('CHF 3.23/Min.'),
      nummer: '0900 008 008',
    },
  ],

  // -------------------------------------------------------------- Kontakt
  ctaTitel: de('Sie brauchen einen Termin? Rufen Sie uns an.'),
  praxisName: 'Arztpraxis am Dorfplatz',
  strasse: 'Dorfplatz 2',
  plzOrt: '6330 Cham',
  telefon: '041 780 09 45',
  hinMail: 'Arztpraxis-am-Dorfplatz@hin.ch',
  hinHinweis: de(
    '(HIN-verschlüsselt für vertrauliche medizinische Anliegen. Keine medizinischen Auskünfte über gewöhnliche E-Mail.)',
  ),
  rollstuhlHinweis: de('Die Praxis ist rollstuhlgängig.'),
  terminHinweis: de(
    'Termine nach telefonischer Vereinbarung. Wenn Sie einen Termin nicht wahrnehmen können, melden Sie sich bitte rechtzeitig.',
  ),
  anfahrt: [
    {
      _key: 'oev',
      titel: de('Mit dem öffentlichen Verkehr'),
      text: de('Die Haltestelle Gemeindehaus liegt nur wenige Meter von der Praxis entfernt.'),
    },
    {
      _key: 'auto',
      titel: de('Mit dem Auto'),
      text: de(
        'Die Anfahrt ist via Zugerstrasse, Luzernerstrasse und Sinserstrasse möglich. Die Praxis liegt am Knotenpunkt dieser Anfahrtswege.',
      ),
    },
    {
      _key: 'parkieren',
      titel: de('Parkieren'),
      text: de('Ideale Parkmöglichkeiten bietet das Parkhaus Lorzensaal (50 Rappen für die erste Stunde).'),
    },
  ],
}

const team = [
  {name: 'Romy Banz', funktion: de('Medizinische Praxisassistentin'), reihenfolge: 10},
  {name: 'Pascale Gamma', funktion: de('Medizinische Praxisassistentin'), reihenfolge: 20},
  {
    name: 'Oleksandra Matvieieva',
    funktion: de('Medizinische Praxisassistentin (MPA) in Ausbildung'),
    reihenfolge: 30,
  },
  {name: 'Franziska Matter', funktion: de('Medizinische Praxisassistentin'), reihenfolge: 40},
]

const kennung = (name) =>
  'team-' +
  name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')

async function main() {
  await client.createOrReplace({_id: 'praxis', _type: 'praxis', ...inhalt})
  console.log('✓ Praxis-Dokument geschrieben')

  for (const person of team) {
    const _id = kennung(person.name)
    // Portraet nicht ueberschreiben: Bilder werden im Studio gepflegt.
    await client
      .transaction()
      .createIfNotExists({_id, _type: 'teamMitglied', name: person.name})
      .patch(_id, (p) => p.set({name: person.name, funktion: person.funktion, reihenfolge: person.reihenfolge}))
      .commit()
    console.log(`✓ ${person.name}`)
  }

  // Alte Eintraege mit «Frau» im Namen entfernen — sie wurden ersetzt.
  const veraltet = await client.fetch(`*[_type == "teamMitglied" && name match "Frau *"]._id`)
  for (const _id of veraltet) {
    await client.delete(_id)
    console.log(`− veralteter Eintrag entfernt: ${_id}`)
  }
}

main().catch((fehler) => {
  console.error(fehler.message)
  process.exit(1)
})
