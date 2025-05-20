/// <reference types="vite/client" />

// 为Vue实例添加全局属性类型定义
import musicPlayer from './utils/musicPlayer';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $musicPlayer: typeof musicPlayer;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
