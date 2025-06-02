import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from 'lovable-tagger';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: '::', // Écoute sur toutes les interfaces
    port: 8080, // Port personnalisé
    proxy: {
      '/detect-text-multiple': {
        target: 'http://localhost:8000', // URL de votre API
        changeOrigin: true, // Simule une origine différente pour éviter CORS
        rewrite: (path) => path.replace(/^\/detect-text-multiple/, '/detect-text-multiple'), // Garde le chemin intact
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
}));