import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import {VitePWA, VitePWAOptions} from "vite-plugin-pwa"

// https://vitejs.dev/config/
const manifestForPlugin: Partial<VitePWAOptions> = {
  registerType :"prompt",
  includeAssets: ["favicon.png", "apple-icon-180.png", "manifest-icon-192.maskable.png"],
  manifest: {
    name: "Kanban",
    short_name: "Kanban",
    description: "Track your work effortlessly",
    icons: [
      {
        "src": "/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/manifest-icon-192.maskable.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "any"
      },
      {
        "src": "/manifest-icon-512.maskable.png",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
      },
      {
        "src": "/apple-icon-180.png",
        "sizes": "180x180",
        "type": "image/png"
      },
      {
        "src": "/favicon.png",
        "sizes": "255x255",
        "type": "image/png"
      },
    ],
    theme_color: "#000000",
    background_color: "#ffffff",
    display: "standalone",
    scope: "/",
    start_url: "/",
    orientation: "portrait"
  }
}

export default defineConfig({
  plugins: [react(), VitePWA(manifestForPlugin)],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
