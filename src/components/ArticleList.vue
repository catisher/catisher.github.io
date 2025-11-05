<script setup lang="ts">
import { blogConfig } from '../config'
import { RouterLink } from 'vue-router'
import { ref, computed } from 'vue'
import { ElPagination } from 'element-plus'

// 定义文章接口
interface Article {
  id: string
  title: string
  excerpt: string
  category: string
  tags: string[]
  date: string
  author: string
  cover?: string
}

// 定义组件的props
const props = defineProps<{
  articles: Article[]
}>()

const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
const postsPerPage = blogConfig.blog.postsPerPage || 10

// 分页相关
const currentPage = ref(1)
const totalArticles = computed(() => props.articles.length)

// 计算当前页的文章
const currentArticles = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage
  const endIndex = startIndex + postsPerPage
  return props.articles.slice(startIndex, endIndex)
})

// 格式化日期
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}

// 页码变化处理
function handleCurrentChange(page: number) {
  currentPage.value = page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="articles-container">
    <article
      v-for="article in currentArticles"
      :key="article.id"
      class="article-card"
    >
      <div class="article-content">
        <RouterLink :to="{ name: 'ArticleDetail', params: { id: article.id } }" class="article-cover-container" v-if="article.cover">
          <img :src="article.cover" :alt="article.title" class="article-cover" />
        </RouterLink>
        <div class="article-text">
          <RouterLink :to="{ name: 'ArticleDetail', params: { id: article.id } }">
            <h2 class="article-title">{{ article.title }}</h2>
          </RouterLink>
          <div class="article-meta">
            <span class="date">发表于 {{ formatDate(article.date) }}</span>
            <span v-if="article.tags.length > 0" class="tags-text">{{ article.tags.join(' | ') }}</span>
          </div>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-footer">
            <span class="author">{{ article.author }}</span>
            <RouterLink 
              :to="{ name: 'ArticleDetail', params: { id: article.id } }"
              class="read-more"
            >
              阅读更多 →
            </RouterLink>
          </div>
        </div>
      </div>
    </article>
    
    <!-- Element Plus 分页组件 -->
    <div class="pagination-container">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalArticles"
        v-model:current-page="currentPage"
        v-model:page-size="postsPerPage"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<style scoped>
.articles-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.article-card:hover {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.article-content {
  display: flex;
  gap: 1.5rem;
}

.article-cover-container {
  flex: 0 0 200px;
  overflow: hidden;
  border-radius: 8px;
}

.article-cover {
  width: 100%;
  height: 140px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.article-card:hover .article-cover {
  transform: scale(1.05);
}

.article-text {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 1.3rem;
  margin: 0 0 0.8rem 0;
  color: #333;
  text-decoration: none;
  line-height: 1.4;
  transition: color 0.3s ease;
}

.article-title:hover {
  color: #667eea;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 0.8rem;
  font-size: 0.9rem;
  color: #666;
}

.date {
  color: #667eea;
  font-weight: 500;
}

.tags-text {
  color: #888;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: auto;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
}

.author {
  color: #888;
  font-size: 0.9rem;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.read-more:hover {
  color: #764ba2;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

/* 自定义 Element Plus 分页组件样式 */
:deep(.el-pagination) {
  --el-pagination-bg-color: rgba(255, 255, 255, v-bind(cardOpacity));
  --el-pagination-border-color: rgba(255, 255, 255, v-bind(borderOpacity));
  --el-pagination-hover-bg-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
  --el-pagination-active-color: #667eea;
  --el-pagination-active-bg-color: #f0f0f0;
}

:deep(.el-pagination .el-pager li.active) {
  background-color: #667eea;
  color: white;
}

:deep(.el-pagination .el-pager li) {
  border-radius: 4px;
}

:deep(.el-pagination__prev:hover:not(.is-disabled)),
:deep(.el-pagination__next:hover:not(.is-disabled)),
:deep(.el-pagination .el-pager li:hover:not(.active)) {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
}

@media (max-width: 768px) {
  .article-content {
    flex-direction: column;
  }
  
  .article-cover-container {
    flex: none;
  }
  
  .article-cover {
    height: 180px;
  }
  
  .article-title {
    font-size: 1.2rem;
  }
  
  .article-meta {
    flex-direction: column;
    gap: 0.5rem;
    font-size: 0.85rem;
  }
  
  .pagination-container {
    margin-top: 1.5rem;
  }
  
  :deep(.el-pagination) {
    --el-pagination-font-size: 0.85rem;
  }
}
</style>