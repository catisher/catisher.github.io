<script setup lang="ts">
import { blogConfig } from '../../config'
import { Document as DocumentIcon } from '@element-plus/icons-vue'
import { RouterLink } from 'vue-router'

// 定义文章接口
interface Article {
  id: string
  title: string
  date?: string
}

// 定义组件的props
defineProps<{
  articles: Article[]
}>()

const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<template>
  <el-card v-if="articles.length > 0" class="recent-articles-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h4 class="section-title">
          <el-icon><DocumentIcon /></el-icon>
          最新文章
        </h4>
      </div>
    </template>
    <ul class="recent-articles-list">
      <li v-for="article in articles" :key="article.id">
        <RouterLink 
          :to="{ name: 'ArticleDetail', params: { id: article.id } }"
          class="recent-article-link"
        >
          <span class="recent-article-title">{{ article.title }}</span>
          <span v-if="article.date" class="recent-article-date">{{ formatDate(article.date) }}</span>
        </RouterLink>
      </li>
    </ul>
  </el-card>
</template>

<style scoped>
.recent-articles-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
}

.recent-articles-card:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
}

.card-header {
  padding: 0;
}

.section-title {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
}

.recent-articles-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.recent-article-link {
  display: flex;
  flex-direction: column;
  padding: 8px 0;
  text-decoration: none;
  color: #303133;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  transition: color 0.2s ease;
}

.recent-article-link:hover {
  color: #409eff;
}

.recent-article-link:last-child {
  border-bottom: none;
}

.recent-article-title {
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.recent-article-date {
  font-size: 12px;
  color: #909399;
}
</style>