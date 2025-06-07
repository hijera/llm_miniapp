import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // Базовый путь для GitHub Pages (замени 'llm_miniapp' на имя твоего репозитория)
  base: process.env.NODE_ENV === 'production' ? '/llm_miniapp/' : '/',
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Генерируем sourcemaps для отладки
    sourcemap: false,
    // Минификация для продакшена
    minify: 'terser',
    // Оптимизация чанков
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          vuetify: ['vuetify']
        }
      }
    }
  }
}) 