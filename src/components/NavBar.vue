<script setup lang="ts">
import { blogConfig } from '../config'

// 从配置中解构出透明度设置
const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
</script>

<template>
  <header class="navbar">
    <div class="container">
      <router-link to="/" class="logo">{{ blogConfig.site.name }}</router-link>
      <nav class="nav">
        <router-link to="/" class="nav-item">首页</router-link>
        <router-link to="/about" class="nav-item">关于</router-link>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  background-color: rgba(255, 255, 255, v-bind(cardOpacity)); /* 使用配置中的透明度 */
  backdrop-filter: blur(5px);
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity)); /* 使用配置中的边框透明度 */
  transition: all 0.3s ease;
}

.navbar:hover {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover)); /* 使用配置中的悬停透明度 */
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