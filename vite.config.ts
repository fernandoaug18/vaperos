import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // 👈 obligatorio con dominio propio (www.vaperos.cl)
  server: {
    port: 8080
  }
})
