import { defineConfig } from "vite";
import { ViteEjsPlugin as viteEjsPlugin } from 'vite-plugin-ejs'

export default defineConfig({
  plugins: [
    viteEjsPlugin({
        title: 'Getting started with SvelteKit in your ear',
    }),
  ],
});