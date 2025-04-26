import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    nodePolyfills({
      protocolImports: true, // this ensures 'process' polyfills are enabled
    }),
  ],
  resolve: {
    alias: {
      global: 'globalthis',
      buffer: 'buffer',
      process: 'process/browser', // Explicitly define 'process' to the browser polyfill
    },
  },
  optimizeDeps: {
    include: ['buffer', 'process'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
        process: 'process/browser', // Ensuring process polyfill is available
      },
    },
  },
});
