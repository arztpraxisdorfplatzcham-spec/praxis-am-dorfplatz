import {createClient} from '@sanity/client'

/**
 * Der Client wird nur beim Bauen der Seite verwendet. Das Token steht in
 * .env und landet nicht im ausgelieferten HTML.
 */
export const sanity = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID,
  dataset: import.meta.env.SANITY_DATASET,
  apiVersion: import.meta.env.SANITY_API_VERSION ?? '2026-08-10',
  token: import.meta.env.SANITY_READ_TOKEN,
  useCdn: false,
})

export type Lang = 'de' | 'ru'

export type Localized = {de?: string; ru?: string}

/** Nimmt die gewuenschte Sprache, faellt auf Deutsch zurueck. */
export function t(value: Localized | undefined, lang: Lang = 'de'): string {
  if (!value) return ''
  const text = (lang === 'ru' ? value.ru : value.de) || value.de || ''
  // «Dr. med.» nie über zwei Zeilen umbrechen (Wunsch der Ärztin, 30.09.2026)
  return text.replace(/Dr\.\s+med\./g, 'Dr. med.')
}

export type Bild = {asset?: {url?: string}; alt?: string; quelle?: string}

export type Oeffnungszeit = {tag: Localized; zeit: string}
export type Ferien = {von: string; bis: string; hinweis?: Localized}
export type TeamMitglied = {
  name: string
  funktion?: Localized
  portrait?: Bild
}
export type AngebotGruppe = {titel?: Localized; punkte?: Localized[]}
export type Notfallnummer = {name: string; zusatz?: Localized; nummer: string}
export type Anfahrt = {titel?: Localized; text?: Localized}
export type Menuepunkt = {titel?: Localized; anker: string}
export type FehlerLink = {titel?: Localized; ziel: string}

export type PraxisDaten = {
  // Startseite
  seoTitel?: Localized
  seoBeschreibung?: Localized
  heroEyebrow?: Localized
  heroTitel?: Localized
  heroText?: Localized
  // Uebernahme
  uebernahmeAnzeigen?: boolean
  uebernahmeText?: Localized
  // Patientenbrief
  briefTitel?: Localized
  briefEinleitung?: Localized
  briefAbsaetze?: Localized[]
  // Aerztin
  arztName: string
  arztTitel?: Localized
  arztBio?: Localized
  arztSprachen?: Localized
  arztPortrait?: Bild
  // Team
  teamTitel?: Localized
  team?: TeamMitglied[]
  // Angebot
  angebotTitel?: Localized
  angebotEinleitung?: Localized
  angebotGruppen?: AngebotGruppe[]
  // Sprechzeiten
  sprechzeitenTitel?: Localized
  sprechzeitenText?: Localized
  oeffnungszeiten?: Oeffnungszeit[]
  zeitenHinweis?: Localized
  absageregelung?: Localized
  sprechzeitenNeu?: Localized
  // Ferien
  betriebsferien?: Ferien[]
  ferienHinweis?: Localized
  // Notfall
  notfallTitel?: Localized
  notfallText?: Localized
  notfallSofort?: Localized
  notrufNummer?: string
  notfallnummern?: Notfallnummer[]
  // Kontakt
  ctaTitel?: Localized
  praxisName: string
  strasse?: string
  plzOrt?: string
  telefon: string
  hinMail?: string
  hinHinweis?: Localized
  rollstuhlHinweis?: Localized
  terminHinweis?: Localized
  anfahrt?: Anfahrt[]
  // Bilder
  heroBild?: Bild
  sprechzeitenBild?: Bild
  ctaBildLinks?: Bild
  ctaBildRechts?: Bild
  // Beschriftungen
  navigation?: Menuepunkt[]
  teamLabel?: Localized
  zeitenLabel?: Localized
  ferienTitel?: Localized
  notfallListeLabel?: Localized
  kontaktTitel?: Localized
  sprachenLabel?: Localized
  mailLabel?: Localized
  karteKnopf?: Localized
  mehrLabel?: Localized
  wenigerLabel?: Localized
  footerPraxis?: Localized
  footerRechtliches?: Localized
  footerImpressum?: Localized
  footerDatenschutz?: Localized
  // Fehlerseite
  fehlerTitel?: Localized
  fehlerText?: Localized
  fehlerLinks?: FehlerLink[]
  fehlerTelefonTitel?: Localized
  fehlerTelefonText?: Localized
  fehlerNotfallText?: Localized
}

/**
 * Ein einziger Aufruf beim Bauen. Faellt Sanity aus oder ist ein Feld leer,
 * greifen die Vorgaben weiter unten — die Seite laesst sich immer bauen.
 */
export async function ladePraxisDaten(): Promise<PraxisDaten> {
  const daten = await sanity.fetch<Partial<PraxisDaten> | null>(`
    *[_id == "praxis"][0] {
      ...,
      arztPortrait { alt, asset-> { url } },
      heroBild { alt, asset-> { url } },
      sprechzeitenBild { alt, asset-> { url } },
      ctaBildLinks { asset-> { url } },
      ctaBildRechts { asset-> { url } },
      "team": *[_type == "teamMitglied"] | order(reihenfolge asc) {
        name, funktion, portrait { alt, asset-> { url } }
      }
    }
  `)

  return {
    ...daten,
    arztName: daten?.arztName || 'Dr. med. Natalia Fiechtner',
    praxisName: daten?.praxisName || 'Arztpraxis am Dorfplatz',
    telefon: daten?.telefon || '041 780 09 45',
    strasse: daten?.strasse || 'Dorfplatz 2',
    plzOrt: daten?.plzOrt || '6330 Cham',
    uebernahmeAnzeigen: daten?.uebernahmeAnzeigen ?? true,
    notrufNummer: daten?.notrufNummer || '144',
    oeffnungszeiten: daten?.oeffnungszeiten?.length
      ? daten.oeffnungszeiten
      : [
          {tag: {de: 'Montag', ru: 'Понедельник'}, zeit: '8.00 – 17.00'},
          {tag: {de: 'Dienstag', ru: 'Вторник'}, zeit: '8.00 – 16.00'},
          {tag: {de: 'Mittwoch', ru: 'Среда'}, zeit: '8.00 – 16.00'},
          {tag: {de: 'Donnerstag', ru: 'Четверг'}, zeit: '8.00 – 16.00'},
          {tag: {de: 'Freitag', ru: 'Пятница'}, zeit: '8.00 – 17.00'},
        ],
    betriebsferien: daten?.betriebsferien ?? [],
    team: daten?.team ?? [],
    angebotGruppen: daten?.angebotGruppen ?? [],
    notfallnummern: daten?.notfallnummern ?? [],
    anfahrt: daten?.anfahrt ?? [],
    navigation: daten?.navigation?.length
      ? daten.navigation
      : [
          {anker: '#team', titel: {de: 'Team'}},
          {anker: '#angebot', titel: {de: 'Angebot'}},
          {anker: '#sprechzeiten', titel: {de: 'Sprechzeiten'}},
          {anker: '#notfall', titel: {de: 'Notfall'}},
          {anker: '#kontakt', titel: {de: 'Kontakt'}},
        ],
    fehlerLinks: daten?.fehlerLinks ?? [],
    briefAbsaetze: daten?.briefAbsaetze ?? [],
  }
}

/** Telefonnummer fuer tel:-Links: 041 780 09 45 -> +41417800945 */
export function telHref(nummer: string): string {
  const ziffern = nummer.replace(/\D/g, '')
  return ziffern.startsWith('0') ? `+41${ziffern.slice(1)}` : `+${ziffern}`
}

/** 2026-09-14 -> Montag, 14.09.2026 */
export function datumLang(iso: string): string {
  const d = new Date(iso)
  const tage = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
  const p = (n: number) => String(n).padStart(2, '0')
  return `${tage[d.getDay()]}, ${p(d.getDate())}.${p(d.getMonth() + 1)}.${d.getFullYear()}`
}

/** Quadratischer Zuschnitt, fuer Portraets. */
export function bildUrl(bild: Bild | undefined, groesse: number): string | undefined {
  const url = bild?.asset?.url
  return url ? `${url}?w=${groesse}&h=${groesse}&fit=crop&auto=format` : undefined
}

/** Breitenskalierung ohne festes Seitenverhaeltnis. */
export function bildBreite(bild: Bild | undefined, breite: number): string | undefined {
  const url = bild?.asset?.url
  return url ? `${url}?w=${breite}&fit=max&auto=format` : undefined
}

/**
 * Redaktioneller Zeilenumbruch: ein senkrechter Strich im Text trennt die
 * Zeilen einer grossen Ueberschrift. Auf kleinen Bildschirmen wird er
 * ignoriert, dort laeuft der Text ohnehin um.
 */
export function zeilen(text: string): string[] {
  return text.split('|').map((z) => z.trim()).filter(Boolean)
}
