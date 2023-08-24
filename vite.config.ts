import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const viteConfig = defineConfig((mode) => {
  const env = loadEnv(mode.mode, process.cwd());
  return {
    resolve: { // 这里配置需要注意：Vite新版本resolve配置改为对象形式，如下：
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, "src"),
        },
      ]
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    server: {
      proxy: {

        '/api': {
          target: env.VITE_ADMIN_PROXY_PATH, // 目标服务器地址
          ws: true, // 是否启用 WebSocket
          changeOrigin: true, // 是否修改请求头中的 Origin 字段
          rewrite: (path) => path.replace(/^\/api/, ''),
        }
      }
    }
  }
})


export default viteConfig
