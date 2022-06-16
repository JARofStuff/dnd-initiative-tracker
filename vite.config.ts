import { defineConfig } from 'vite';
// import react from 'vite-preset-react';
import react from '@vitejs/plugin-react';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@root': path.resolve(__dirname),
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@views': path.resolve(__dirname, 'src/views'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@context': path.resolve(__dirname, 'src/context'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(__dirname, 'src/hooks'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
  plugins: [react(), svgrPlugin()],
  server: {
    https: true,
  },
  build: {
    sourcemap: true,
  },
});
