import { defineStore } from 'pinia'
// import axios from 'axios' // 实际项目中会使用axios调用API

export interface Article {
  id: string
  title: string
  content: string
  excerpt: string
  cover?: string
  category: string
  tags: string[]
  date: string
  author: string
}

export const useBlogStore = defineStore('blog', {
  state: () => ({
    articles: [] as Article[],
    categories: [] as string[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    getArticleById: (state) => (id: string) => {
      return state.articles.find(article => article.id === id)
    },

    getArticlesByCategory: (state) => (category: string) => {
      return state.articles.filter(article => article.category === category)
    },

    getRecentArticles: (state) => {
      return [...state.articles]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)
    }
  },

  actions: {
    async fetchArticles() {
      this.loading = true
      try {
        // 从生成的JSON文件加载文章数据
        // 注意：在开发环境中，Vite会处理这种导入；在生产环境中，我们已经通过脚本生成了数据
        const articles = await import('../data/articles.json')
        this.articles = articles.default || articles
        
        // 提取所有分类
        const categorySet = new Set(this.articles.map(a => a.category))
        this.categories = Array.from(categorySet)
      } catch (error) {
        this.error = '获取文章失败'
        console.error('Error fetching articles:', error)
        // 如果加载失败，使用一些默认的示例数据
        this.articles = [
          {
            id: 'default-1',
            title: '加载文章失败',
            content: '# 加载文章失败\n\n无法从数据文件加载文章，请确保已运行构建命令。',
            excerpt: '文章加载失败，请重新构建项目。',
            category: '系统',
            tags: ['错误'],
            date: new Date().toISOString().split('T')[0] || new Date().toDateString(),
            author: '系统'
          }
        ]
        this.categories = ['系统']
      } finally {
        this.loading = false
      }
    }
  }
})