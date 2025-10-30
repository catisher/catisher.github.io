<template>
  <div class="article-detail">
    <div v-if="loading" class="loading">加载中...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="article" class="article-content">
      <header class="article-header">
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="category">{{ article.category }}</span>
          <span class="date">{{ formatDate(article.date) }}</span>
          <span class="author">{{ article.author }}</span>
        </div>
        <div class="article-tags">
          <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </header>
      
      <div class="markdown-content" v-html="renderedContent"></div>
      
      <div class="article-actions">
        <router-link to="/" class="back-home">返回首页</router-link>
      </div>
    </div>
    <div v-else class="not-found">文章不存在</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownIt from 'markdown-it'

const route = useRoute()
const blogStore = useBlogStore()
const md = new MarkdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
})

const loading = ref(false)
const error = ref<string | null>(null)

const article = computed(() => {
  const id = route.params.id as string
  return blogStore.getArticleById(id)
})

const renderedContent = computed(() => {
  if (!article.value) return ''
  return md.render(article.value.content)
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
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.article-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: white;
}

.loading,
.error,
.not-found {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #666;
}

.error {
  color: #e74c3c;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-header h1 {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.article-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
}

.category {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  background: #f0f0f0;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
}

.markdown-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
}

.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content a {
  color: #667eea;
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content code {
  background: #f5f5f5;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
}

.markdown-content pre {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1rem;
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content blockquote {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin-left: 0;
  color: #666;
  font-style: italic;
}

.markdown-content ul,
.markdown-content ol {
  margin-bottom: 1rem;
  padding-left: 2rem;
}

.markdown-content img {
  max-width: 100%;
  border-radius: 8px;
}

.article-actions {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #eee;
}

.back-home {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s;
}

.back-home:hover {
  background: #764ba2;
}
</style>