<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from './stores/blog'

const blogStore = useBlogStore()

onMounted(() => {
  // 预加载文章数据
  blogStore.fetchArticles()
})
</script>

<template>
  <div class="app">
    <!-- 导航栏 -->
    <header class="navbar">
      <div class="container">
        <router-link to="/" class="logo">我的博客</router-link>
        <nav class="nav">
          <router-link to="/" class="nav-item">首页</router-link>
          <router-link to="/about" class="nav-item">关于</router-link>
        </nav>
      </div>
    </header>

    <!-- 主要内容区 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ new Date().getFullYear() }} 我的技术博客. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #f5f7fa;
  color: #333;
  line-height: 1.6;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* 导航栏样式 */
.navbar {
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
  text-decoration: none;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-item {
  color: #666;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-item:hover,
.nav-item.router-link-active {
  color: #667eea;
}

/* 页脚样式 */
.footer {
  background: #333;
  color: white;
  padding: 2rem 0;
  margin-top: 3rem;
}

.footer p {
  text-align: center;
  opacity: 0.8;
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .navbar .container {
    flex-direction: column;
    gap: 1rem;
  }
  
  .nav {
    gap: 1rem;
  }
}
</style>
