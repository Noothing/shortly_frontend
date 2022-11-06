import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      $lib: path.resolve(__dirname, './src/lib'),
      $routes: path.resolve(__dirname, './src/routes'),
      $core: path.resolve(__dirname, './src/lib/Core'),
      $pages: path.resolve(__dirname, './src/pages'),
    }
  },
  optimizeDeps: {
    exclude: ['tinro']
  },
});
