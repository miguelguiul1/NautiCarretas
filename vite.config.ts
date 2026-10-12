import { existsSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    // A foto do Fábio só entra no site se o arquivo existir (checado no build/ao subir o dev server).
    __FOTO_FABIO__: JSON.stringify(existsSync('public/media/fabio-oficina.webp')),
  },
})
