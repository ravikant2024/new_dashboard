import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: false, // Disable source maps for production build
  },
  server: {
    host: true,
    port: 5173,
    hmr: true, // Enable hot module replacement for live reloading
    fs: {
      strict: true, // Enforce strict file system rules, could help with network visibility
    },
    // Disable source maps in development as well
    watch: {
      usePolling: true, // Forces polling for file watching (useful in certain environments)
    },
  },
});
