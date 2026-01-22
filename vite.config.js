import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true, // Ecouter sur toutes les interfaces (0.0.0.0)
    port: 5173,
    allowedHosts: true, // Autoriser tous les hôtes en dev
  },
  plugins: [react()],
})
