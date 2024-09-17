import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // This enables external access
    port: 3000   // Optionally set the port to 3000 if you prefer
  }
});