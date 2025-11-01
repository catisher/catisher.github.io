<script setup lang="ts">
// 主内容区域组件
</script>

<template>
  <!-- 主要内容区 -->
  <main class="main-content">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </main>
</template>

<style scoped>
.main-content {
  min-height: calc(100vh - 120px); /* 确保主内容区域有足够高度 */
  padding: 2rem 0;
  width: 100%;
  box-sizing: border-box;
}

/* 响应式调整 */
@media (max-width: 1024px) {
  .main-content {
    padding: 1.5rem 0;
  }
}

@media (max-width: 768px) {
  .main-content {
    padding: 1rem 0;
    min-height: auto; /* 移动设备上不固定最小高度 */
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 0.8rem 0;
  }
}

/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>