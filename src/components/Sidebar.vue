<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useBlogStore } from '../stores/blog'

// 导入卡片组件
import InfoCard from './cards/InfoCard.vue'
import CategoryCard from './cards/CategoryCard.vue'
import RecentArticlesCard from './cards/RecentArticlesCard.vue'
import LinksCard from './cards/LinksCard.vue'

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

// 格式化日期功能已移至RecentArticlesCard组件中实现
</script>

<template>
  <div class="sidebar">
    <!-- 简介卡片 -->
    <InfoCard />
    
    <!-- 分类卡片 -->
    <CategoryCard 
      v-if="categories.length > 0" 
      :categories="categories"
      @category-click="handleCategoryClick"
    />
    
    <!-- 最新文章卡片 -->
    <RecentArticlesCard 
      v-if="recentArticles.length > 0" 
      :articles="recentArticles"
    />
    
    <!-- 链接卡片 -->
    <LinksCard />
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

/* 确保元素盒模型正确 */
.sidebar {
  box-sizing: border-box;
  width: 100%;
}

/* 响应式设计 - 平板设备 */
@media (max-width: 1024px) {
  .sidebar {
    padding: 15px;
  }
}

/* 响应式设计 - 移动设备 */
@media (max-width: 768px) {
  .sidebar {
    padding: 10px 15px 15px;
    height: auto;
    overflow-y: visible;
  }
}

/* 响应式设计 - 小屏幕手机 */
@media (max-width: 480px) {
  .sidebar {
    padding: 8px 12px 12px;
  }
}
</style>