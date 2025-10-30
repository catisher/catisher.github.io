<template>
  <div class="home">
    <header class="hero">
      <h1>我的技术博客</h1>
      <p>记录前端开发的点滴</p>
    </header>

    <main class="main-content">
      <div class="articles-container">
        <article
          v-for="article in blogStore.articles"
          :key="article.id"
          class="article-card"
        >
          <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">
            <h2 class="article-title">{{ article.title }}</h2>
          </router-link>
          <div class="article-meta">
            <span class="category">{{ article.category }}</span>
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

      <aside class="sidebar">
        <div class="categories">
          <h3>文章分类</h3>
          <ul>
            <li v-for="category in blogStore.categories" :key="category">
              <router-link :to="{ name: 'Category', params: { name: category } }">
                {{ category }}
              </router-link>
            </li>
          </ul>
        </div>
        
        <div class="recent-articles">
          <h3>最新文章</h3>
          <ul>
            <li v-for="article in blogStore.getRecentArticles" :key="article.id">
              <router-link :to="{ name: 'ArticleDetail', params: { id: article.id } }">
                {{ article.title }}
              </router-link>
            </li>
          </ul>
        </div>
      </aside>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchArticles()
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-align: center;
  padding: 3rem 1rem;
  margin-bottom: 2rem;
}

.hero h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
}

.hero p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.articles-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.article-card {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.article-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.article-title {
  font-size: 1.5rem;
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

.category {
  background: #667eea;
  color: white;
  padding: 0.2rem 0.8rem;
  border-radius: 4px;
  font-size: 0.8rem;
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
  background: #f0f0f0;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  font-size: 0.8rem;
  color: #666;
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

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.sidebar > div {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.sidebar h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin-bottom: 0.5rem;
}

.sidebar a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.sidebar a:hover {
  color: #667eea;
}

@media (max-width: 768px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}
</style>