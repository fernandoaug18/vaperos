import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',           // 👈 obligatorio con dominio propio (www.vaperos.cl)
  // build: { outDir: 'dist' } // (opcional) si algún día cambias la carpeta
})
