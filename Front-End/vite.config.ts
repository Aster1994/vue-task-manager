import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa'; // generates the manifest + service worker (PWA)
import manifest from './public/manifest.json' with { type: 'json' };

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['images/favicon.svg', 'images/apple-touch-icon.png'], // extra files to precache
      manifest,
      workbox: {
        // Cache the built app (JS, CSS, HTML, fonts, icons) so it opens instantly and offline
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Never answer API calls (or the assetlinks file) with index.html from the cache
        navigateFallbackDenylist: [/^\/api\//, /^\/\.well-known\//],
        cleanupOutdatedCaches: true, // delete caches of old versions
      },
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
