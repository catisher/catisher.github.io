// 博客配置文件 - 集中管理所有可配置项
export const blogConfig = {
  // 网站基础信息
  site: {
    name: '我的技术博客',
    title: '我的技术博客',
    subtitle: '记录前端开发的点滴',
    description: '专注于前端开发，分享技术心得和项目经验',
    baseUrl: 'http://localhost:5173', // 部署后的域名
  },
  
  // 博主信息
  author: {
    name: '技术博主',
    description: '专注于前端开发，热爱分享技术心得',
    bio: '你好！我是一名资深前端开发者，拥有多年的开发经验。主要技术栈包括Vue.js、React、TypeScript等。我创建这个博客的目的是为了分享我的技术学习心得、项目经验，以及对前端技术的一些见解。如果你有任何问题或建议，欢迎通过以下方式联系我。',
    contact: {
      email: 'example@example.com',
      github: 'github.com/example',
      weibo: '@技术博主',
    },
    skills: [
      'Vue.js', 'React', 'TypeScript', 'JavaScript', 'HTML/CSS',
      'Vite', 'Webpack', 'Pinia', 'Vuex', 'Axios'
    ]
  },
  
  // 博客设置
  blog: {
    postsPerPage: 10,
    recentPostsLimit: 5,
    defaultAuthor: '技术博主',
    defaultCategory: '前端',
  },
  
  // 主题配置
  theme: {
    primaryColor: '#667eea',
    secondaryColor: '#764ba2',
    backgroundColor: '#f5f7fa',
    textColor: '#333',
  },
  
  // 背景图配置
  background: {
    enabled: true,
    imagePath: '/src/assets/images/background.jpg',
    opacity: 0.03,
    fixed: true,
    repeat: 'repeat',
    position: 'center center',
    size: 'auto',
  },
  
  // 社交媒体
  social: {
    github: 'https://github.com',
    twitter: '',
    weibo: '',
    wechat: '',
  },
  
  // 版权信息
  copyright: `© ${new Date().getFullYear()} 我的技术博客. All rights reserved.`,
}