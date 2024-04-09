import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/index.ts"),
      name: "index",
      fileName: "index",
      formats: ["es", "umd"]
    },
    copyPublicDir: false
  },
  plugins: [svelte(), dts({ include: "lib" })],
})
