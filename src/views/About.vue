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
        <h2>技术博主</h2>
        <p>专注于前端开发，热爱分享技术心得</p>
      </div>
      
      <div class="bio">
        <h3>个人简介</h3>
        <p>你好！我是一名资深前端开发者，拥有多年的开发经验。主要技术栈包括Vue.js、React、TypeScript等。</p>
        <p>我创建这个博客的目的是为了分享我的技术学习心得、项目经验，以及对前端技术的一些见解。</p>
        <p>如果你有任何问题或建议，欢迎通过以下方式联系我。</p>
      </div>
      
      <div class="contact">
        <h3>联系方式</h3>
        <ul>
          <li>邮箱：example@example.com</li>
          <li>GitHub：github.com/example</li>
          <li>微博：@技术博主</li>
        </ul>
      </div>
      
      <div class="skills">
        <h3>技术栈</h3>
        <div class="skills-grid">
          <span class="skill-tag">Vue.js</span>
          <span class="skill-tag">React</span>
          <span class="skill-tag">TypeScript</span>
          <span class="skill-tag">JavaScript</span>
          <span class="skill-tag">HTML/CSS</span>
          <span class="skill-tag">Vite</span>
          <span class="skill-tag">Webpack</span>
          <span class="skill-tag">Pinia</span>
          <span class="skill-tag">Vuex</span>
          <span class="skill-tag">Axios</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
// 可以在这里添加逻辑
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