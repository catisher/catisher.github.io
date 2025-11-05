<script setup lang="ts">
import { blogConfig } from '../../config'
import { CollectionTag } from '@element-plus/icons-vue'

// 定义组件的props和emits
defineProps<{
  categories: string[]
}>()

const emit = defineEmits<{
  'category-click': [categoryId: string]
}>()

const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
</script>

<template>
  <el-card v-if="categories.length > 0" class="category-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <h4 class="section-title">
          <el-icon><CollectionTag /></el-icon>
          文章分类
        </h4>
      </div>
    </template>
    <el-menu class="category-menu">
      <el-menu-item
        v-for="category in categories"
        :key="category"
        :index="`/category/${category}`"
        @click="emit('category-click', category)"
      >
        {{ category }}
      </el-menu-item>
    </el-menu>
  </el-card>
</template>

<style scoped>
.category-card {
  margin-bottom: 20px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
}

.category-card:hover {
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

.category-menu {
  border-radius: 8px;
  overflow: hidden;
  background-color: rgba(255, 255, 255, v-bind(cardOpacity));
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity));
  transition: all 0.3s ease;
}

.category-menu:hover {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover));
}
</style>