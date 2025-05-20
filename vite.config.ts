import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// 引入path
import { resolve } from 'path'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    // 设置路径别名
    alias: {
      '@': resolve(__dirname, './src'),
      '*': resolve('')
    },
   
  },
  build: {
    outDir: 'dist', // 确保构建后的文件输出到 dist 目录
  }
})
