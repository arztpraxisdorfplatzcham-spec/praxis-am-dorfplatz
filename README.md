# Arztpraxis am Dorfplatz — Website

Website der Arztpraxis am Dorfplatz, Dorfplatz 2, 6330 Cham: https://arztpraxis-am-dorfplatz.ch

## Aufbau

| Ordner | Inhalt |
|---|---|
| `web/` | Die Website (Astro). Wird beim Bauen als statisches HTML erzeugt. |
| `sanity/` | Das Redaktionssystem (Sanity Studio): https://praxis-am-dorfplatz.sanity.studio |

Texte und Bilder werden im Sanity Studio gepflegt, nicht im Code. Im Code stehen nur Gestaltung,
Reihenfolge der Abschnitte sowie Impressum und Datenschutzerklärung.

## Veröffentlichen

Netlify baut die Website automatisch neu:

- nach jedem «Publish» im Sanity Studio (Webhook → Netlify-Build-Hook)
- nach jedem Push auf `main`

Einstellungen in Netlify: Basisverzeichnis `web`, Build-Befehl `npm run build`, Ausgabe `web/dist`
(Details in `web/netlify.toml`). Umgebungsvariablen in Netlify: `SANITY_PROJECT_ID`,
`SANITY_DATASET`, `SANITY_API_VERSION` (Werte siehe `web/.env.example`). Der Datensatz ist
öffentlich, deshalb braucht der Build kein Token; `SANITY_READ_TOKEN` wäre nur bei einem privaten
Datensatz nötig.

## Lokal arbeiten

```bash
cd web && npm install && npm run dev        # Website → http://localhost:4321
cd sanity && npm install && npm run dev     # Studio  → http://localhost:3333
```

Zugangsdaten gehören in `web/.env` bzw. `sanity/.env` (Vorlage: `.env.example`), nie ins Repository.
