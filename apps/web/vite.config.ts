import { defineConfig, loadEnv } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import path from "path"

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

    const SERVER_PORT = process.env.VITE_SERVER_PORT ? parseInt(process.env.VITE_SERVER_PORT) : 5000
    const CLIENT_PORT = process.env.VITE_CLIENT_PORT ? parseInt(process.env.VITE_CLIENT_PORT) : 3000

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                "@": path.resolve(__dirname, "src"),
            },
        },
        server: {
            proxy: {
                "/api": {
                    target: `http://localhost:${SERVER_PORT}`,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, "/api"),
                },
                "/ws": {
                    target: `http://localhost:${SERVER_PORT}`,
                    ws: true,
                    changeOrigin: true,
                },
                "/ws-battle": {
                    target: `http://localhost:${SERVER_PORT}`,
                    ws: true,
                    changeOrigin: true,
                },
            },
            port: CLIENT_PORT,
        },
    }
})
