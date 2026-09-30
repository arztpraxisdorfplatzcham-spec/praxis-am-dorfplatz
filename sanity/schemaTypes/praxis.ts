import {defineType, defineField, defineArrayMember} from 'sanity'

/**
 * Singleton: der gesamte Inhalt der Startseite.
 *
 * Fruehere Fassung war bewusst klein — nur Zeiten, Ferien, Telefon. Auf Wunsch
 * der Auftraggeberin ist jetzt jeder sichtbare Text der Startseite hier
 * aenderbar. Damit die Liste trotzdem lesbar bleibt, sind die Felder in
 * Registerkarten gruppiert, die der Reihenfolge der Abschnitte auf der Seite
 * folgen.
 *
 * Im Code bleiben: Gestaltung, Reihenfolge der Abschnitte, Navigation und die
 * beiden Rechtstexte (Impressum, Datenschutz).
 */
export const praxis = defineType({
  name: 'praxis',
  title: 'Praxis',
  type: 'document',
  groups: [
    {name: 'start', title: 'Startseite', default: true},
    {name: 'uebernahme', title: 'Übernahme-Hinweis'},
    {name: 'brief', title: 'Patientenbrief'},
    {name: 'aerztin', title: 'Ärztin'},
    {name: 'team', title: 'Team'},
    {name: 'angebot', title: 'Angebot'},
    {name: 'zeiten', title: 'Sprechzeiten'},
    {name: 'ferien', title: 'Betriebsferien'},
    {name: 'notfall', title: 'Notfall'},
    {name: 'kontakt', title: 'Kontakt'},
    {name: 'bilder', title: 'Bilder'},
    {name: 'beschriftungen', title: 'Beschriftungen'},
    {name: 'fehler', title: 'Fehlerseite'},
  ],
  fields: [
    // ------------------------------------------------------------- Startseite
    defineField({
      name: 'seoTitel',
      title: 'Titel im Browser-Tab und bei Google',
      description: 'Etwa 60 Zeichen. Sollte Ort und Fachgebiet enthalten.',
      type: 'localizedString',
      group: 'start',
    }),
    defineField({
      name: 'seoBeschreibung',
      title: 'Kurzbeschreibung für Google',
      description: 'Etwa 160 Zeichen. Erscheint in der Trefferliste unter dem Titel.',
      type: 'localizedText',
      group: 'start',
    }),
    defineField({
      name: 'heroEyebrow',
      title: 'Kleine Zeile über der Überschrift',
      type: 'localizedString',
      group: 'start',
    }),
    defineField({
      name: 'heroTitel',
      title: 'Grosse Überschrift ganz oben',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'start',
    }),
    defineField({
      name: 'heroText',
      title: 'Text unter der Überschrift',
      type: 'localizedText',
      group: 'start',
    }),

    // --------------------------------------------------------- Uebernahme
    defineField({
      name: 'uebernahmeAnzeigen',
      title: 'Übernahme-Hinweis anzeigen',
      description:
        'Der Hinweis zur Praxisübernahme erscheint nur, solange dieser Schalter aktiv ist. Er kann rund ein Jahr nach dem 1. September 2026 abgeschaltet werden — die übrigen Abschnitte rücken dann automatisch zusammen.',
      type: 'boolean',
      initialValue: true,
      group: 'uebernahme',
      options: {layout: 'switch'},
    }),
    defineField({
      name: 'uebernahmeText',
      title: 'Text des Übernahme-Hinweises',
      type: 'localizedText',
      group: 'uebernahme',
      hidden: ({document}) => !document?.uebernahmeAnzeigen,
    }),

    // ------------------------------------------------------ Patientenbrief
    defineField({
      name: 'briefTitel',
      title: 'Überschrift des Briefes',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'brief',
    }),
    defineField({
      name: 'briefEinleitung',
      title: 'Erster Absatz',
      description: 'Dieser Absatz ist immer sichtbar. Der Rest steht hinter «Mehr lesen».',
      type: 'localizedText',
      group: 'brief',
    }),
    defineField({
      name: 'briefAbsaetze',
      title: 'Weitere Absätze',
      description: 'Erscheinen erst, wenn die Besucherin auf «Mehr lesen» klickt.',
      type: 'array',
      group: 'brief',
      of: [defineArrayMember({type: 'localizedText'})],
    }),

    // -------------------------------------------------------------- Ärztin
    defineField({
      name: 'arztName',
      title: 'Name',
      description: 'Erscheint im Brief, im Team-Abschnitt, im Kontakt und im Fussbereich.',
      type: 'string',
      group: 'aerztin',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'arztTitel',
      title: 'Fachtitel',
      type: 'localizedString',
      group: 'aerztin',
    }),
    defineField({
      name: 'arztBio',
      title: 'Kurzer Werdegang',
      type: 'localizedText',
      group: 'aerztin',
    }),
    defineField({
      name: 'arztSprachen',
      title: 'Sprachen',
      description: 'Zum Beispiel: Deutsch, Russisch, Ukrainisch.',
      type: 'localizedString',
      group: 'aerztin',
    }),
    defineField({
      name: 'arztPortrait',
      title: 'Porträt',
      description: 'Quadratisches Bild (1:1). Der Bildausschnitt lässt sich nachträglich anpassen.',
      type: 'image',
      options: {hotspot: true},
      group: 'aerztin',
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          description: 'Für Menschen, die einen Screenreader benutzen.',
          type: 'string',
        }),
      ],
    }),

    // ---------------------------------------------------------------- Team
    defineField({
      name: 'teamTitel',
      title: 'Überschrift über dem Team',
      description:
        'Die einzelnen Personen werden links unter «Team» gepflegt. Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'team',
    }),

    // ------------------------------------------------------------- Angebot
    defineField({
      name: 'angebotTitel',
      title: 'Überschrift',
      type: 'localizedString',
      group: 'angebot',
    }),
    defineField({
      name: 'angebotEinleitung',
      title: 'Einleitender Text',
      type: 'localizedText',
      group: 'angebot',
    }),
    defineField({
      name: 'angebotGruppen',
      title: 'Leistungsgruppen',
      description: 'Jede Gruppe erscheint als eigene Spalte mit Überschrift und Liste.',
      type: 'array',
      group: 'angebot',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titel', title: 'Überschrift', type: 'localizedString'}),
            defineField({
              name: 'punkte',
              title: 'Einzelne Leistungen',
              type: 'array',
              of: [defineArrayMember({type: 'localizedString'})],
            }),
          ],
          preview: {select: {title: 'titel.de'}},
        }),
      ],
    }),

    // ------------------------------------------------------------- Zeiten
    defineField({
      name: 'sprechzeitenTitel',
      title: 'Überschrift',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'zeiten',
    }),
    defineField({
      name: 'sprechzeitenText',
      title: 'Text zur Terminvereinbarung',
      description: 'Die Absageregelung wird automatisch angehängt.',
      type: 'localizedText',
      group: 'zeiten',
    }),
    defineField({
      name: 'oeffnungszeiten',
      title: 'Öffnungszeiten',
      description: 'Eine Zeile pro Wochentag. Wird auf der Startseite als Tabelle ausgegeben.',
      type: 'array',
      group: 'zeiten',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'tag', title: 'Wochentag', type: 'localizedString'}),
            defineField({
              name: 'zeit',
              title: 'Zeit',
              type: 'string',
              description: 'Zum Beispiel: 8.00 – 17.00. Bei geschlossenen Tagen: geschlossen',
            }),
          ],
          preview: {select: {title: 'tag.de', subtitle: 'zeit'}},
        }),
      ],
      validation: (Rule) => Rule.min(1),
    }),
    defineField({
      name: 'zeitenHinweis',
      title: 'Hinweis unter den Öffnungszeiten',
      description: 'Zum Beispiel: Durchgehend geöffnet, keine Mittagspause.',
      type: 'localizedString',
      group: 'zeiten',
    }),
    defineField({
      name: 'absageregelung',
      title: 'Absageregelung',
      description:
        'Bis wann ein Termin abgesagt werden soll. Steht im Fliesstext, nicht als Warnhinweis.',
      type: 'localizedText',
      group: 'zeiten',
    }),
    defineField({
      name: 'sprechzeitenNeu',
      title: 'Hervorgehobener Hinweis',
      description: 'Steht farbig unter den Zeiten. Leer lassen, wenn es nichts zu melden gibt.',
      type: 'localizedString',
      group: 'zeiten',
    }),

    // ------------------------------------------------------------- Ferien
    defineField({
      name: 'betriebsferien',
      title: 'Betriebsferien',
      description:
        'Vergangene Einträge verschwinden von selbst. Ist die Liste leer, erscheint der Abschnitt nicht auf der Website.',
      type: 'array',
      group: 'ferien',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'von',
              title: 'Von',
              type: 'date',
              options: {dateFormat: 'DD.MM.YYYY'},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'bis',
              title: 'Bis',
              type: 'date',
              options: {dateFormat: 'DD.MM.YYYY'},
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'hinweis',
              title: 'Zusätzlicher Hinweis',
              description: 'Freiwillig. Zum Beispiel: Die Praxis ist telefonisch nicht besetzt.',
              type: 'localizedString',
            }),
          ],
          preview: {select: {title: 'von', subtitle: 'bis'}},
        }),
      ],
    }),
    defineField({
      name: 'ferienHinweis',
      title: 'Text unter den Ferienterminen',
      type: 'localizedText',
      group: 'ferien',
    }),

    // ------------------------------------------------------------ Notfall
    defineField({
      name: 'notfallTitel',
      title: 'Überschrift',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'notfall',
    }),
    defineField({
      name: 'notfallText',
      title: 'Einleitender Text',
      type: 'localizedText',
      group: 'notfall',
    }),
    defineField({
      name: 'notfallSofort',
      title: 'Hinweis über der grossen Nummer',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'notfall',
    }),
    defineField({
      name: 'notrufNummer',
      title: 'Grosse Notrufnummer',
      description: 'In der Schweiz 144. Nur ändern, wenn sich das offiziell ändert.',
      type: 'string',
      group: 'notfall',
      initialValue: '144',
    }),
    defineField({
      name: 'notfallnummern',
      title: 'Weitere Anlaufstellen',
      description:
        'Diese Nummern müssen stimmen. Bitte vor jeder Änderung auf der Website der jeweiligen Klinik prüfen.',
      type: 'array',
      group: 'notfall',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Name der Stelle',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'zusatz',
              title: 'Zusatz',
              description: 'Zum Beispiel: 24-Stunden-Notfallaufnahme',
              type: 'localizedString',
            }),
            defineField({
              name: 'nummer',
              title: 'Telefonnummer',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {select: {title: 'name', subtitle: 'nummer'}},
        }),
      ],
    }),

    // ------------------------------------------------------------ Kontakt
    defineField({
      name: 'ctaTitel',
      title: 'Überschrift im grünen Aufruf-Feld',
      description: 'Ein senkrechter Strich | erzeugt auf grossen Bildschirmen einen Zeilenumbruch.',
      type: 'localizedString',
      group: 'kontakt',
    }),
    defineField({
      name: 'praxisName',
      title: 'Name der Praxis',
      type: 'string',
      group: 'kontakt',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'strasse',
      title: 'Strasse und Nummer',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'plzOrt',
      title: 'PLZ und Ort',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'telefon',
      title: 'Telefonnummer',
      description: 'Erscheint in der Kopfzeile, im Fussbereich und in mehreren Abschnitten.',
      type: 'string',
      group: 'kontakt',
      initialValue: '041 780 09 45',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hinMail',
      title: 'HIN-Mail-Adresse',
      type: 'string',
      group: 'kontakt',
    }),
    defineField({
      name: 'hinHinweis',
      title: 'Hinweis zur HIN-Mail',
      type: 'localizedText',
      group: 'kontakt',
    }),
    defineField({
      name: 'rollstuhlHinweis',
      title: 'Hinweis zur Zugänglichkeit',
      type: 'localizedString',
      group: 'kontakt',
    }),
    defineField({
      name: 'terminHinweis',
      title: 'Kleiner Hinweis zur Terminvereinbarung',
      type: 'localizedText',
      group: 'kontakt',
    }),
    defineField({
      name: 'anfahrt',
      title: 'Anfahrt',
      description: 'Die drei Spalten unter der Karte.',
      type: 'array',
      group: 'kontakt',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titel', title: 'Überschrift', type: 'localizedString'}),
            defineField({name: 'text', title: 'Text', type: 'localizedText'}),
          ],
          preview: {select: {title: 'titel.de'}},
        }),
      ],
    }),

    // -------------------------------------------------------------- Bilder
    defineField({
      name: 'heroBild',
      title: 'Grosses Bild ganz oben',
      description: 'Breites Format (etwa 21:9). Wird als erstes geladen — bitte nicht riesig.',
      type: 'image',
      options: {hotspot: true},
      group: 'bilder',
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'sprechzeitenBild',
      title: 'Bild neben den Sprechzeiten',
      description: 'Hochformat (4:5).',
      type: 'image',
      options: {hotspot: true},
      group: 'bilder',
      fields: [defineField({name: 'alt', title: 'Bildbeschreibung', type: 'string'})],
    }),
    defineField({
      name: 'ctaBildLinks',
      title: 'Rundes Bild links im Aufruf-Feld',
      description: 'Quadratisch (1:1). Rein schmückend, ragt unten links aus der grünen Karte.',
      type: 'image',
      options: {hotspot: true},
      group: 'bilder',
    }),
    defineField({
      name: 'ctaBildRechts',
      title: 'Rundes Bild rechts im Aufruf-Feld',
      description: 'Quadratisch (1:1). Rein schmückend, ragt oben rechts aus der grünen Karte.',
      type: 'image',
      options: {hotspot: true},
      group: 'bilder',
    }),

    // ------------------------------------------------------- Beschriftungen
    defineField({
      name: 'navigation',
      title: 'Menü',
      description:
        'Reihenfolge und Beschriftung der Menüpunkte. Das Sprungziel ist der technische Anker des Abschnitts — bitte nur ändern, wenn Sie wissen, was Sie tun.',
      type: 'array',
      group: 'beschriftungen',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titel', title: 'Beschriftung', type: 'localizedString'}),
            defineField({name: 'anker', title: 'Sprungziel', type: 'string'}),
          ],
          preview: {select: {title: 'titel.de', subtitle: 'anker'}},
        }),
      ],
    }),
    ...[
      ['teamLabel', 'Kleine Zeile über dem Team'],
      ['zeitenLabel', 'Überschrift des Zeiten-Kastens'],
      ['ferienTitel', 'Überschrift der Betriebsferien'],
      ['notfallListeLabel', 'Zeile über der Liste der Anlaufstellen'],
      ['kontaktTitel', 'Überschrift von Kontakt und Anfahrt'],
      ['sprachenLabel', 'Beschriftung vor den Sprachen'],
      ['mailLabel', 'Beschriftung vor der HIN-Adresse'],
      ['karteKnopf', 'Knopf unter der Karte'],
      ['mehrLabel', 'Knopf «mehr anzeigen»'],
      ['wenigerLabel', 'Knopf «weniger anzeigen»'],
      ['footerPraxis', 'Fussbereich: Überschrift erste Spalte'],
      ['footerRechtliches', 'Fussbereich: Überschrift zweite Spalte'],
      ['footerImpressum', 'Fussbereich: Link zum Impressum'],
      ['footerDatenschutz', 'Fussbereich: Link zur Datenschutzerklärung'],
    ].map(([name, title]) =>
      defineField({name, title, type: 'localizedString', group: 'beschriftungen'}),
    ),

    // --------------------------------------------------------- Fehlerseite
    defineField({
      name: 'fehlerTitel',
      title: 'Überschrift',
      type: 'localizedString',
      group: 'fehler',
    }),
    defineField({
      name: 'fehlerText',
      title: 'Text darunter',
      type: 'localizedText',
      group: 'fehler',
    }),
    defineField({
      name: 'fehlerLinks',
      title: 'Vorgeschlagene Ziele',
      type: 'array',
      group: 'fehler',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({name: 'titel', title: 'Beschriftung', type: 'localizedString'}),
            defineField({name: 'ziel', title: 'Adresse', type: 'string'}),
          ],
          preview: {select: {title: 'titel.de', subtitle: 'ziel'}},
        }),
      ],
    }),
    defineField({
      name: 'fehlerTelefonTitel',
      title: 'Überschrift des Telefon-Kastens',
      type: 'localizedString',
      group: 'fehler',
    }),
    defineField({
      name: 'fehlerTelefonText',
      title: 'Text im Telefon-Kasten',
      type: 'localizedText',
      group: 'fehler',
    }),
    defineField({
      name: 'fehlerNotfallText',
      title: 'Notfall-Hinweis unten',
      description: '**Fett** hebt hervor, ein senkrechter Strich | bricht die Zeile um.',
      type: 'localizedText',
      group: 'fehler',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Praxis — Inhalt der Startseite'}),
  },
})
