<template>
  <div class="home">
    <Banner />
    
    <main class="main-content">
      <ArticleList :articles="blogStore.articles" />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useBlogStore } from '../stores/blog'
import Banner from '../components/Banner.vue'
import ArticleList from '../components/ArticleList.vue'

const blogStore = useBlogStore()

onMounted(() => {
  blogStore.fetchArticles()
})
</script>

<style scoped>
.home {
  min-height: 100vh;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
</style>