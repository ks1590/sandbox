import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    hmr: false, // これで HMR 完全無効
  },
  plugins: [react()],
});
