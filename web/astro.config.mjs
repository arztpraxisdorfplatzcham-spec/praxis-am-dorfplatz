// @ts-check
import {defineConfig} from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// Statische Ausgabe: Der Build holt die Inhalte einmal aus Sanity und schreibt
// fertiges HTML. Besucherinnen und Besucher der Website nehmen nie Verbindung
// zu Sanity auf — ausgeliefert wird von unserem Schweizer Hosting.
export default defineConfig({
  output: 'static',
  site: 'https://arztpraxis-am-dorfplatz.ch',
  vite: {
    plugins: [tailwindcss()],
  },
})
