<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import { blogConfig } from '../config'

// 从配置中解构出透明度设置
const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
import {
  Menu as MenuIcon,
  CollectionTag,
  User as UserIcon,
  Setting as SettingIcon,
  HomeFilled,
  List,
  InfoFilled,
  Document as DocumentIcon
} from '@element-plus/icons-vue'

const router = useRouter()
const blogStore = useBlogStore()

// 分类数据，从store获取
const categories = ref(blogStore.categories)

// 最新文章，从store获取
const recentArticles = computed(() => blogStore.getRecentArticles || [])

// 处理分类点击
const handleCategoryClick = (categoryId: string) => {
  router.push(`/category/${categoryId}`)
}

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<template>
  <div class="sidebar">
    <!-- 简介卡片 -->
    <el-card class="info-card" shadow="hover">
      <div class="blog-info">
        <h3 class="blog-title">{{ blogConfig.site.title }}</h3>
        <p class="blog-desc">{{ blogConfig.site.description }}</p>
      </div>
    </el-card>
    
    <!-- 导航菜单 -->
    <el-menu
      :default-active="$route.path"
      class="sidebar-menu"
      @select="(key: string) => router.push(key)"
      router
    >
      <el-menu-item index="/">
        <el-icon><HomeFilled /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="/category">
        <el-icon><List /></el-icon>
        <span>分类</span>
      </el-menu-item>
      <el-menu-item index="/about">
        <el-icon><InfoFilled /></el-icon>
        <span>关于</span>
      </el-menu-item>
    </el-menu>
    
    <!-- 分类卡片 -->
    <el-card v-if="categories.length > 0" class="category-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h4 class="section-title">
            <el-icon><CollectionTag /></el-icon>
            文章分类
          </h4>
        </div>
      </template>
      <el-menu class="category-menu">
        <el-menu-item
          v-for="category in categories"
          :key="category.id || category"
          :index="`/category/${category.id || category}`"
          @click="category.id ? handleCategoryClick(category.id) : null"
        >
          {{ category.name || category }}{{ category.count ? ` (${category.count})` : '' }}
        </el-menu-item>
      </el-menu>
    </el-card>
    
    <!-- 最新文章卡片 -->
    <el-card v-if="recentArticles.length > 0" class="recent-articles-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h4 class="section-title">
            <el-icon><DocumentIcon /></el-icon>
            最新文章
          </h4>
        </div>
      </template>
      <ul class="recent-articles-list">
        <li v-for="article in recentArticles" :key="article.id">
          <router-link 
            :to="{ name: 'ArticleDetail', params: { id: article.id } }"
            class="recent-article-link"
          >
            <span class="recent-article-title">{{ article.title }}</span>
            <span v-if="article.date" class="recent-article-date">{{ formatDate(article.date) }}</span>
          </router-link>
        </li>
      </ul>
    </el-card>
    
    <!-- 链接卡片 -->
    <el-card class="links-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <h4 class="section-title">
            <el-icon><SettingIcon /></el-icon>
            链接
          </h4>
        </div>
      </template>
      <ul class="links-list">
        <li v-for="link in blogConfig.links" :key="link.name">
          <a :href="link.url" target="_blank" rel="noopener noreferrer">
            {{ link.name }}
          </a>
        </li>
      </ul>
    </el-card>
  </div>
</template>

<style scoped>
.sidebar {
  height: 100%;
  padding: 20px;
  background-color: transparent;
  box-shadow: none;
  overflow-y: auto;
}

/* 卡片间距 */
.info-card,
.category-card,
.links-card,
.recent-articles-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity)); /* 使用配置中的透明度 */
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity)); /* 使用配置中的边框透明度 */
}

.info-card:hover,
.category-card:hover,
.links-card:hover,
.recent-articles-card:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover)); /* 使用配置中的悬停透明度 */
}

/* 博客信息 */
.blog-info {
  text-align: center;
  padding: 10px 0;
}

.blog-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #303133;
}

.blog-desc {
  font-size: 12px;
  color: #909399;
  margin: 0;
  line-height: 1.5;
}

/* 菜单样式 */
.sidebar-menu,
.category-menu {
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity)); /* 使用配置中的透明度 */
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity)); /* 使用配置中的边框透明度 */
  transition: all 0.3s ease;
}

.sidebar-menu:hover,
.category-menu:hover {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover)); /* 使用配置中的悬停透明度 */
}

/* 卡片头部 */
.card-header {
  padding: 0;
}

/* 分区标题 */
.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #606266;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 6px;
}

/* 分类菜单 */
.category-menu {
  border: none;
  background: transparent;
}

.category-menu .el-menu-item {
  padding-left: 0;
  height: 36px;
  line-height: 36px;
  font-size: 13px;
  border-radius: 4px;
}

/* 最新文章列表 */
.recent-articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-articles-list li {
  margin-bottom: 10px;
}

.recent-article-link {
  display: flex;
  flex-direction: column;
  color: #606266;
  text-decoration: none;
  transition: all 0.3s ease;
  padding: 4px 0;
  font-size: 13px;
}

.recent-article-link:hover {
  color: #409eff;
}

.recent-article-title {
  font-weight: 500;
  line-height: 1.4;
  margin-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-article-date {
  font-size: 11px;
  color: #909399;
}

.category-menu .el-menu-item:hover {
  background-color: #ecf5ff;
}

/* 链接列表 */
.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  margin-bottom: 8px;
}

.links-list a {
  color: #606266;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.3s;
  display: block;
  padding: 4px 8px;
  border-radius: 4px;
}

.links-list a:hover {
  color: #409eff;
  background-color: #ecf5ff;
}

/* 确保元素盒模型正确 */
.sidebar,
.info-card,
.category-card,
.links-card,
.sidebar-menu {
  box-sizing: border-box;
  width: 100%;
}

/* 响应式设计 - 平板设备 */
@media (max-width: 1024px) {
  .sidebar {
    padding: 15px;
  }
  
  .info-card,
  .category-card,
  .links-card,
  .sidebar-menu {
    margin-bottom: 15px;
    border-radius: 6px;
  }
  
  .blog-title {
    font-size: 17px;
  }
  
  .blog-desc {
    font-size: 11px;
  }
  
  .section-title {
    font-size: 13px;
  }
  
  .category-menu .el-menu-item {
    font-size: 12px;
    height: 32px;
    line-height: 32px;
  }
}

/* 响应式设计 - 移动设备 */
@media (max-width: 768px) {
  .sidebar {
    padding: 10px 15px 15px;
    height: auto;
    overflow-y: visible;
  }
  
  .info-card,
  .category-card,
  .links-card,
  .sidebar-menu {
    margin-bottom: 10px;
    border-radius: 4px;
    padding: 10px;
  }
  
  .blog-title {
    font-size: 16px;
    margin-bottom: 6px;
  }
  
  .blog-desc {
    font-size: 11px;
    line-height: 1.4;
  }
  
  .section-title {
    font-size: 12px;
    gap: 4px;
  }
  
  .category-menu .el-menu-item {
    font-size: 12px;
    height: 30px;
    line-height: 30px;
    padding: 0;
  }
  
  .links-list li {
    margin-bottom: 6px;
  }
  
  .links-list a {
    font-size: 12px;
    padding: 3px 6px;
  }
  
  /* 确保图标在小屏幕上正确显示 */
  .el-icon {
    font-size: 14px;
  }
}

/* 响应式设计 - 小屏幕手机 */
@media (max-width: 480px) {
  .sidebar {
    padding: 8px 12px 12px;
  }
  
  .info-card,
  .category-card,
  .links-card,
  .sidebar-menu {
    padding: 8px;
    margin-bottom: 8px;
  }
  
  .blog-title {
    font-size: 15px;
  }
  
  .blog-info {
    padding: 5px 0;
  }
  
  .el-menu-item {
    height: 36px !important;
    line-height: 36px !important;
    padding: 0 10px !important;
    font-size: 12px;
  }
  
  .el-menu-item__icon {
    margin-right: 4px;
    font-size: 14px;
  }
  
  /* 确保卡片内容不会溢出 */
  .el-card__body {
    word-break: break-word;
  }
  
  /* 确保菜单在小屏幕上不会水平溢出 */
  .el-menu {
    overflow-x: hidden;
  }
}
</style>