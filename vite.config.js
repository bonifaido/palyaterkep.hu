import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import process from 'node:process'

export default defineConfig(() => {
  const locale = process.env.VITE_SITE_LOCALE || 'hu'
  if (!['hu', 'en'].includes(locale)) {
    throw new Error(`Unsupported VITE_SITE_LOCALE: ${locale}`)
  }

  return {
    plugins: [
      react(),
      {
        name: 'site-html',
        transformIndexHtml(html) {
          if (locale === 'en') {
            return html
              .replace('<html lang="hu">', '<html lang="en">')
              .replace('<title>palyaterkep.hu</title>', '<title>Career Map – A Visual Self-Knowledge Tool for Career Guidance</title>')
              .replace('<!-- SITE_ANALYTICS -->', '')
          }
          return html.replace(
            '<!-- SITE_ANALYTICS -->',
            `<script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "34dd6e598c4945a99d160f6f330014c8"}'></script>`
          )
        },
      },
    ],
  }
})
