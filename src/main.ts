import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { blogConfig } from './config'
// 直接导入背景图文件，这样Vite会正确处理资源路径
import backgroundImage from './assets/images/background.jpg'

const app = createApp(App)
const pinia = createPinia()

// 动态设置背景样式
if (blogConfig.background.enabled) {
  const root = document.documentElement
  const body = document.body
  
  // 配置CSS变量，使其可以在整个应用中使用
  root.style.setProperty('--bg-image', `url(${backgroundImage})`)
  root.style.setProperty('--bg-repeat', blogConfig.background.repeat)
  root.style.setProperty('--bg-attachment', blogConfig.background.fixed ? 'fixed' : 'scroll')
  root.style.setProperty('--bg-position', blogConfig.background.position)
  root.style.setProperty('--bg-size', blogConfig.background.size)
  
  // 直接设置body的样式以确保背景图可见
  body.style.backgroundImage = `url(${backgroundImage})`
  body.style.backgroundRepeat = blogConfig.background.repeat
  body.style.backgroundAttachment = blogConfig.background.fixed ? 'fixed' : 'scroll'
  body.style.backgroundPosition = blogConfig.background.position
  body.style.backgroundSize = blogConfig.background.size
  body.style.backgroundColor = 'transparent'
}

app.use(pinia)
app.use(router)

app.mount('#app')
