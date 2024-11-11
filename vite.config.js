import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from "vite-plugin-mkcert";
import { fileURLToPath, URL } from "node:url";

// https://vite.dev/config/
export default defineConfig({
    server: { https: true, host: true },
    plugins: [react(), mkcert()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/assets/variables.scss"; @import "@/assets/mixins.scss";`,
            },
        },
    },
})
