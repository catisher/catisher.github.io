<template>
  <div class="about">
    <header class="about-header">
      <h1>关于我</h1>
    </header>
    
    <main class="about-content">
      <div class="profile">
        <div class="avatar">
          <div class="avatar-placeholder">
            <span>博主</span>
          </div>
        </div>
        <h2>{{ blogConfig.author.name }}</h2>
        <p>{{ blogConfig.author.description }}</p>
      </div>
      
      <div class="bio">
        <h3>个人简介</h3>
        <p>{{ blogConfig.author.bio }}</p>
      </div>
      
      <div class="contact">
        <h3>联系方式</h3>
        <ul>
          <li v-if="blogConfig.author.contact.email">邮箱：{{ blogConfig.author.contact.email }}</li>
          <li v-if="blogConfig.author.contact.github">GitHub：{{ blogConfig.author.contact.github }}</li>
          <li v-if="blogConfig.author.contact.weibo">微博：{{ blogConfig.author.contact.weibo }}</li>
        </ul>
      </div>
      
      <div class="skills">
        <h3>技术栈</h3>
        <div class="skills-grid">
          <span v-for="skill in blogConfig.author.skills" :key="skill" class="skill-tag">
            {{ skill }}
          </span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { blogConfig } from '../config'
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
  min-height: 100vh;
  background: white;
}

.about-header {
  text-align: center;
  margin-bottom: 2rem;
}

.about-header h1 {
  font-size: 2.5rem;
  color: #333;
}

.profile {
  text-align: center;
  margin-bottom: 3rem;
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
}

.profile p {
  color: #666;
  font-size: 1.1rem;
}

.bio,
.contact,
.skills {
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.bio h3,
.contact h3,
.skills h3 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 1rem;
  border-bottom: 2px solid #667eea;
  padding-bottom: 0.5rem;
}

.bio p {
  line-height: 1.6;
  color: #666;
  margin-bottom: 1rem;
}

.contact ul {
  list-style: none;
  padding: 0;
}

.contact li {
  line-height: 1.8;
  color: #666;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.contact li:last-child {
  border-bottom: none;
}

.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.skill-tag {
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  transition: transform 0.3s;
}

.skill-tag:hover {
  transform: translateY(-2px);
  background: #764ba2;
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