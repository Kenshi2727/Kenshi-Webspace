import { sentryVitePlugin } from "@sentry/vite-plugin";
import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), VitePWA({
    strategies: 'injectManifest',
    srcDir: 'src',
    filename: 'sw.js',
    registerType: 'autoUpdate',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'Kenshi Webspace',
      short_name: 'Kenshi Webspace',
      description: 'A personal blogging and content website',
      theme_color: '#ffffff',
    },

    injectManifest: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      // Increase precache limit to 5 MB so large JS/CSS files like main bundle can be cached by the service worker
      maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5 MB 
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  }), sentryVitePlugin({
    org: "kenshi-g1",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "kenshi-g1",
    project: "javascript-react"
  }),

  //externalize html2canvas to avoid issues with Vite's optimization
  {
    name: 'externalize-html2canvas',
    resolveId(source) {
      if (source === 'html2canvas') return { id: source, external: true };
      return null;
    }
  }
  ],

  // optimizeDeps: {
  //   include: ["html2canvas"]
  // },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // ✅ Enables @/components/ui/... imports
    },
  },

  build: {
    sourcemap: true,
  }
})