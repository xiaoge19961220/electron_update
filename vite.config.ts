import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', //引用路径
  build: {
    outDir: 'www', // 指定输出路径
    assetsDir: 'assets', // 指定生成静态文件目录
    sourcemap: false, // 构建后是否生成 source map 文件
  },
  server: {
    port: 3000,
    host: "localhost",
    // open:true
  },
})
