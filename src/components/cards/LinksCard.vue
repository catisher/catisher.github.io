<script setup lang="ts">
import { blogConfig } from '../../config'
import { Setting as SettingIcon } from '@element-plus/icons-vue'

const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
</script>

<template>
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
      <li v-if="blogConfig.social.github">
        <a :href="blogConfig.social.github" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </li>
      <li v-if="blogConfig.social.twitter">
        <a :href="blogConfig.social.twitter" target="_blank" rel="noopener noreferrer">
          Twitter
        </a>
      </li>
      <li v-if="blogConfig.social.weibo">
        <a :href="blogConfig.social.weibo" target="_blank" rel="noopener noreferrer">
          微博
        </a>
      </li>
      <li v-if="blogConfig.social.wechat">
        <a :href="blogConfig.social.wechat" target="_blank" rel="noopener noreferrer">
          微信
        </a>
      </li>
    </ul>
  </el-card>
</template>

<style scoped>
.links-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
}

.links-card:hover {
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

.links-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.links-list li {
  padding: 6px 0;
}

.links-list a {
  color: #409eff;
  text-decoration: none;
  transition: color 0.2s ease;
  font-size: 14px;
}

.links-list a:hover {
  color: #66b1ff;
  text-decoration: underline;
}
</style>