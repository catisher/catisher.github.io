<template>
  <div class="article-detail">
    <el-spin v-if="loading" class="loading-container" text="加载中..." />
    <el-alert
      v-else-if="error"
      :title="error"
      type="error"
      show-icon
      class="error-alert"
    />
    <div v-else-if="article" class="article-content">
      <header class="article-header">
        <h1 class="article-title">{{ article.title }}</h1>
        <div class="article-meta">
          <el-tag size="small" type="primary">{{ article.category }}</el-tag>
          <span class="date">📅 {{ formatDate(article.date) }}</span>
          <span class="author">👤 {{ article.author }}</span>
        </div>
        <div class="article-tags">
          <el-tag
            v-for="tag in article.tags"
            :key="tag"
            size="small"
            class="tag"
            effect="plain"
          >
            {{ tag }}
          </el-tag>
        </div>
      </header>
      
      <div class="markdown-content" v-html="renderedContent"></div>
      
      <div class="article-actions">
        <el-button type="primary" round>
          <router-link to="/" class="back-home-link">返回首页</router-link>
        </el-button>
      </div>
    </div>
    <el-empty v-else description="文章不存在" class="empty-container" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useBlogStore } from '../stores/blog'
import MarkdownIt from 'markdown-it'
// Element Plus 组件已经在 main.ts 中全局注册，不需要单独导入

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
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 400px;
}

.error-alert {
  margin: 2rem 0;
}

.empty-container {
  margin: 4rem 0;
}

.article-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
}

.article-title {
  font-size: 2.2rem;
  margin-bottom: 1rem;
  color: #333;
  font-weight: 600;
}

.article-meta {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #666;
  flex-wrap: wrap;
}

.article-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.tag {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
}

.markdown-content {
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;
}

/* Element Plus 主题兼容的 Markdown 样式 */
.markdown-content h1,
.markdown-content h2,
.markdown-content h3,
.markdown-content h4,
.markdown-content h5,
.markdown-content h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: var(--el-text-color-primary, #2c3e50);
  font-weight: 600;
}

.markdown-content h1 { font-size: 1.8rem; }
.markdown-content h2 { font-size: 1.5rem; }
.markdown-content h3 { font-size: 1.3rem; }

.markdown-content p {
  margin-bottom: 1rem;
}

.markdown-content a {
  color: var(--el-color-primary, #667eea);
  text-decoration: none;
}

.markdown-content a:hover {
  text-decoration: underline;
}

.markdown-content code {
  background: var(--el-bg-color-light, #f5f5f5);
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-family: 'Courier New', monospace;
  font-size: 0.9em;
}

.markdown-content pre {
  background: var(--el-bg-color-light, #f5f5f5);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-bottom: 1.5rem;
  border: 1px solid var(--el-border-color, #e0e0e0);
}

.markdown-content pre code {
  background: none;
  padding: 0;
}

.markdown-content blockquote {
  border-left: 4px solid var(--el-color-primary, #667eea);
  padding-left: 1rem;
  margin-left: 0;
  color: var(--el-text-color-secondary, #666);
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
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-actions {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid var(--el-border-color, #eee);
  margin-top: 2rem;
}

.back-home-link {
  color: white;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .article-detail {
    padding: 1rem;
  }
  
  .article-title {
    font-size: 1.8rem;
  }
  
  .article-meta {
    gap: 1rem;
    font-size: 0.8rem;
  }
}
</style>