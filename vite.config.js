import path from "path"
import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    // server: {
    //     proxy: {
    //         '/api/v1': {
    //             target: 'https://evenity-eo-app-production.up.railway.app', // Replace with your API URL
    //             changeOrigin: true,
    //             secure: false, // Only set to false if you are testing with a self-signed SSL
    //         },
    //     },
    // },
})
