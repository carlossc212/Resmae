import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        emptyOutDir: true, // Elimina archivos antiguos al compilar
        rollupOptions: {
            external: ['sqlite3'],
        },
    },
});