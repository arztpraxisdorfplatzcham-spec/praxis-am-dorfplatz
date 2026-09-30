import {defineType, defineField} from 'sanity'

/**
 * Ein Dokument pro Person. So lassen sich Mitarbeiterinnen einzeln
 * hinzufuegen und entfernen, ohne dass jemand die Startseite anfassen muss.
 */
export const teamMitglied = defineType({
  name: 'teamMitglied',
  title: 'Team',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      description: 'Wie auf der Website angezeigt, zum Beispiel: Romy Banz (ohne Anrede)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'funktion',
      title: 'Funktion',
      type: 'localizedString',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'portrait',
      title: 'Porträt',
      description:
        'Quadratisches Bild (1:1). Der Bildausschnitt lässt sich nach dem Hochladen anpassen.',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Bildbeschreibung',
          description: 'Für Menschen, die einen Screenreader benutzen.',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'reihenfolge',
      title: 'Reihenfolge',
      description: 'Kleinere Zahl steht weiter oben.',
      type: 'number',
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: 'Reihenfolge',
      name: 'reihenfolge',
      by: [{field: 'reihenfolge', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'funktion.de', media: 'portrait'},
  },
})
