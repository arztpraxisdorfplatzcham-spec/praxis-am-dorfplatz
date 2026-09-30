import {defineType, defineField} from 'sanity'

/**
 * Zweisprachige Felder (Entscheid D5: Deutsch als Hauptsprache, Russisch als
 * zweite). Sanity bringt keine Mehrsprachigkeit im Kern mit — statt eines
 * Plugins nutzen wir schlichte Objekte mit zwei Feldern. Das hat zwei Vorteile:
 * keine zusaetzliche Abhaengigkeit, und im Studio stehen beide Sprachen
 * untereinander, sodass beim Uebersetzen nichts vergessen wird.
 *
 * Wichtig: Nur uebersetzbarer Text bekommt diesen Typ. Telefonnummern, Zeiten
 * und Daten bleiben einfache Felder — sie sind in beiden Sprachen gleich.
 */

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Text (zweisprachig)',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'string',
      validation: (Rule) => Rule.required().warning('Deutsch ist die Hauptsprache.'),
    }),
    defineField({
      name: 'ru',
      title: 'Russisch / Русский',
      type: 'string',
    }),
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Absatz (zweisprachig)',
  type: 'object',
  fields: [
    defineField({
      name: 'de',
      title: 'Deutsch',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required().warning('Deutsch ist die Hauptsprache.'),
    }),
    defineField({
      name: 'ru',
      title: 'Russisch / Русский',
      type: 'text',
      rows: 4,
    }),
  ],
})
