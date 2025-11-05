<script setup lang="ts">
import { blogConfig } from '../../config'
const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
</script>

<template>
  <el-card class="info-card" shadow="hover">
    <div class="blog-info">
      <h3 class="blog-title">{{ blogConfig.site.title }}</h3>
      <p class="blog-desc">{{ blogConfig.site.description }}</p>
    </div>
  </el-card>
</template>

<style scoped>
.info-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
}

.info-card:hover {
  transform: translateY(-2px);
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
}

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
</style>