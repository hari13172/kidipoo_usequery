import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteSassPlugin from 'vite-plugin-sass';

export default defineConfig({
  plugins: [react(), viteSassPlugin()],
});
