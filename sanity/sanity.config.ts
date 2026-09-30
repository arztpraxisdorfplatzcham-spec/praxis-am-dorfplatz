import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'

/**
 * Studio-Konfiguration.
 *
 * Die Navigation ist bewusst eng gefuehrt: «Praxis» ist ein einzelnes
 * Dokument, das direkt geoeffnet wird — es gibt keine Liste, in der man ein
 * zweites anlegen koennte. Daneben steht nur das Team. Mehr soll im Studio
 * nicht zu sehen sein.
 */
export default defineConfig({
  name: 'praxis-am-dorfplatz',
  title: 'Arztpraxis am Dorfplatz',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Inhalt')
          .items([
            S.listItem()
              .title('Praxis')
              .id('praxis')
              .child(S.document().schemaType('praxis').documentId('praxis')),
            S.divider(),
            S.documentTypeListItem('teamMitglied').title('Team'),
          ]),
    }),
  ],

  schema: {
    types: schemaTypes,
    // Verhindert, dass ueber «Neu erstellen» ein zweites Praxis-Dokument entsteht.
    templates: (prev) => prev.filter((t) => t.schemaType !== 'praxis'),
  },

  document: {
    // Das Singleton darf nicht geloescht oder dupliziert werden.
    actions: (prev, {schemaType}) =>
      schemaType === 'praxis'
        ? prev.filter(({action}) => !['delete', 'duplicate', 'unpublish'].includes(action!))
        : prev,
  },
})
