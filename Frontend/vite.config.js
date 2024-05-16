// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react-swc'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://parking-app-001-client.vercel.app/",
        changeOrigin: true,
        secure: false,
      },
    },
    host:true,
    port:5174
  },
})
