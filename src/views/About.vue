<template>
  <div class="about">
    <el-card class="about-card" shadow="hover">
      <!-- 头部 -->
      <div class="about-header">
        <h1>关于我</h1>
      </div>
      
      <!-- 个人资料 -->
      <div class="profile">
        <div class="avatar">
          <div class="avatar-placeholder">
            <span>博主</span>
          </div>
        </div>
        <h2>{{ blogConfig.author.name }}</h2>
        <p>{{ blogConfig.author.description }}</p>
      </div>
      
      <el-divider />
      
      <!-- 个人简介 -->
      <div class="section">
        <h3>个人简介</h3>
        <p>{{ blogConfig.author.bio }}</p>
      </div>
      
      <el-divider />
      
      <!-- 联系方式 -->
      <div class="section">
        <h3>联系方式</h3>
        <ul>
          <li v-if="blogConfig.author.contact.email">
            <el-icon><Document /></el-icon>
            邮箱：{{ blogConfig.author.contact.email }}
          </li>
          <li v-if="blogConfig.author.contact.github">
            <el-icon><Link /></el-icon>
            GitHub：{{ blogConfig.author.contact.github }}
          </li>
          <li v-if="blogConfig.author.contact.weibo">
            <el-icon><Message /></el-icon>
            微博：{{ blogConfig.author.contact.weibo }}
          </li>
        </ul>
      </div>
      
      <el-divider />
      
      <!-- 技术栈 -->
      <div class="section">
        <h3>技术栈</h3>
        <div class="skills-grid">
          <el-tag 
            v-for="skill in blogConfig.author.skills" 
            :key="skill" 
            class="skill-tag" 
            size="medium"
            effect="dark"
          >
            {{ skill }}
          </el-tag>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { blogConfig } from '../config'
import { Document, Link, Message } from '@element-plus/icons-vue'
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
}

.about-card {
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.about-header {
  text-align: center;
  padding: 1rem 0;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #333;
  margin: 0;
}

.profile {
  text-align: center;
  padding: 1rem 0;
}

.avatar {
  margin-bottom: 1.5rem;
}

.avatar-placeholder {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.profile h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 0.5rem;
  margin-top: 0;
}

.profile p {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.section {
  padding: 1rem 0;
}

.section h3 {
  font-size: 1.3rem;
  color: #333;
  margin: 0 0 1rem 0;
}

.section p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 0;
}

.section ul {
  list-style: none;
  padding: 0;
  margin-bottom: 0;
}

.section li {
  line-height: 1.8;
  color: #666;
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .about-header h1 {
    font-size: 2rem;
  }
  
  .avatar-placeholder {
    width: 120px;
    height: 120px;
    font-size: 1.2rem;
  }
}
</style>