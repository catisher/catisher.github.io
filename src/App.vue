<script setup lang="ts">
import { onMounted } from 'vue'

import { useBlogStore } from './stores/blog'
import { blogConfig } from './config'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import MainContent from './components/MainContent.vue'
import Sidebar from './components/Sidebar.vue'

const blogStore = useBlogStore()

onMounted(() => {
  // 预加载文章数据
  blogStore.fetchArticles()
  
  // 设置页面标题
  document.title = blogConfig.site.title
})
</script>

<template>
  <div class="app">
    <div class="common-layout">
      <el-container>
        <el-header><NavBar /></el-header>
        <el-container>
          <!-- 主内容区域 -->
          <el-container>
            <el-main><MainContent /></el-main>
            <!-- 移动设备上，侧边栏在主内容下方显示 -->
            <el-aside class="mobile-sidebar">
              <Sidebar />
            </el-aside>           
          </el-container>
         
          <!-- 桌面设备上，侧边栏在右侧显示 -->
          <el-aside width="240px" class="desktop-sidebar">
            <Sidebar /> 
           
          </el-aside> 
        
        </el-container>
        <el-footer><Footer /></el-footer>
      </el-container>
    </div>
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

/* 响应式布局 */
/* 默认显示桌面侧边栏，隐藏移动侧边栏 */
.desktop-sidebar {
  display: block;
}

.mobile-sidebar {
  display: none;
  width: 100% !important;
  height: auto !important;
  margin: 0 !important;
  padding: 0 !important;
}

/* 平板设备 */
@media (max-width: 1024px) {
  .desktop-sidebar {
    width: 200px !important;
  }
}

/* 移动设备 */
@media (max-width: 768px) {
  /* 隐藏桌面侧边栏 */
  .desktop-sidebar {
    display: none;
  }
  
  /* 显示移动侧边栏 */
  .mobile-sidebar {
    display: block;
  }
  
  /* 调整容器和内容区域的边距 */
  .el-main {
    padding: 16px;
  }
  
  .el-footer {
    padding: 10px;
  }
}

/* 小屏幕设备 */
@media (max-width: 480px) {
  .el-main {
    padding: 12px;
  }
}

/* 确保容器自适应 */
.common-layout {
  width: 100%;
  min-height: 100vh;
}

.app {
  width: 100%;
  min-height: 100vh;
}
</style>
