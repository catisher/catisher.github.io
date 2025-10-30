<template>
  <div class="category-page">
    <header class="category-header">
      <h1>分类：{{ categoryName }}</h1>
    </header>
    
    <main class="category-content">
      <div v-if="loading" class="loading">加载中...</div>
      <div v-else-if="error" class="error">{{ error }}</div>
      <div v-else-if="articles.length > 0" class="articles-container">
        <article
          v-for="article in articles"
          :key="article.id"
          class="article-card"
        >
          <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">
            <h2 class="article-title">{{ article.title }}</h2>
          </router-link>
          <div class="article-meta">
            <span class="date">{{ formatDate(article.date) }}</span>
            <span class="author">{{ article.author }}</span>
          </div>
          <p class="article-excerpt">{{ article.excerpt }}</p>
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
          <router-link 
            :to="{ name: 'ArticleDetail', params: { id: article.id } }"
            class="read-more"
          >
            阅读更多 →
          </router-link>
        </article>
      </div>
      <div v-else class="no-articles">该分类下暂无文章</div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'

const route = useRoute()
const blogStore = useBlogStore()
const loading = ref(false)
const error = ref<string | null>(null)

const categoryName = computed(() => route.params.name as string)

const articles = computed(() => {
  return blogStore.getArticlesByCategory(categoryName.value)
})

onMounted(async () => {
  if (blogStore.articles.length === 0) {
    loading.value = true
    try {
      await blogStore.fetchArticles()
    } catch (err) {
      error.value = '加载文章失败'
    } finally {
      loading.value = false
    }
  }
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.category-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: white;
}

.category-header {
  text-align: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.category-header h1 {
  font-size: 2rem;
  color: #333;
}

.loading,
.error,
.no-articles {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
  text-decoration: none;
}

.article-title:hover {
  color: #667eea;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.article-excerpt {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.read-more {
  color: #667eea;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s;
}

.read-more:hover {
  color: #764ba2;
}

@media (max-width: 768px) {
  .category-header h1 {
    font-size: 1.8rem;
  }
  
  .article-title {
    font-size: 1.3rem;
  }
}
</style>