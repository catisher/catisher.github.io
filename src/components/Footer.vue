<script setup lang="ts">
import { blogConfig } from '../config'

// 从配置中解构出透明度设置
const { cardOpacity, cardOpacityHover, borderOpacity } = blogConfig.theme
</script>

<template>
  <footer class="footer">
    <div class="container">
      <p>{{ blogConfig.copyright }}</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: rgba(255, 255, 255, v-bind(cardOpacity)); /* 使用配置中的透明度 */
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, v-bind(borderOpacity)); /* 使用配置中的边框透明度 */
  color: #333;
  padding: 1.5rem 0;
  margin-top: 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.footer:hover {
  background-color: rgba(255, 255, 255, v-bind(cardOpacityHover)); /* 使用配置中的悬停透明度 */
}

.footer p {
  text-align: center;
  opacity: 0.9;
  margin: 0;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .footer {
    padding: 1rem 0;
    margin-top: 1.5rem;
    border-radius: 4px;
  }
  
  .footer p {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .footer {
    padding: 0.8rem 0;
  }
  
  .footer p {
    font-size: 0.8rem;
  }
}
</style>