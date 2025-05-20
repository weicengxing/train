// 直接复制到vue.config.js中去就可以了
import { defineConfig } from '@vue/cli-service'

import ElementPlus from 'unplugin-element-plus/webpack'
import AutoImport from 'unplugin-auto-import/webpack'
import Components from 'unplugin-vue-components/webpack'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

import Icons from 'unplugin-icons/webpack'
import IconsResolver from 'unplugin-icons/resolver'

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
  	plugins: [
  		/**
  		ElementPlus({
  			libs: [{
  				libraryName: 'element-plus',
                esModule: true,
                resolveStyle: (name) => {
                	return `element-plus/theme-chalk/${name}.css`
                }
  			}]
  		}),**/
  		// 主要功能：导入组件和样式
  		AutoImport({
        	resolvers: [
        		IconsResolver({
                	prefix: 'Icon',
                }),
        		ElementPlusResolver()
        	],
      	}),
      	// 主要功能：将组件变成全局组件（注册组件）
      	Components({
        	resolvers: [
        		IconsResolver({
        			// alias: { 'icon': "ep", //配置别名 }
                	enabledCollections: ['ep'],
                }),
        		ElementPlusResolver()
        	],
      	}),
      	// 下载所需图标组件
      	Icons({
      		autoInstall: true,
      	})
  	]
  }
})