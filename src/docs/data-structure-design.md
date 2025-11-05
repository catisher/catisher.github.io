# 博客系统数据结构设计文档

本文档详细描述了博客系统中主要的数据结构设计，包括配置数据、状态管理、组件交互等相关数据模型。

## 1. 配置数据结构

### 1.1 博客配置 (blogConfig)

**文件位置**: `src/config/index.ts`

```typescript
interface BlogConfig {
  // 网站基础信息
  site: {
    name: string
    title: string
    subtitle: string
    description: string
    baseUrl: string
  }
  
  // 博主信息
  author: {
    name: string
    description: string
    bio: string
    contact: {
      email: string
      github: string
      weibo: string
    }
    skills: string[]
  }
  
  // 博客设置
  blog: {
    postsPerPage: number
    recentPostsLimit: number
    defaultAuthor: string
    defaultCategory: string
  }
  
  // 主题配置
  theme: {
    primaryColor: string
    secondaryColor: string
    backgroundColor: string
    textColor: string
    cardOpacity: number
    cardOpacityHover: number
    borderOpacity: number
  }
  
  // 背景图配置
  background: {
    enabled: boolean
    imagePath: string
    opacity: number
    fixed: boolean
    repeat: string
    position: string
    size: string
  }
  
  // 社交媒体
  social: {
    github: string
    twitter: string
    weibo: string
    wechat: string
  }
  
  // 版权信息
  copyright: string
}
```

## 2. 状态管理数据结构

### 2.1 文章接口 (Article)

**文件位置**: `src/stores/blog.ts`

```typescript
interface Article {
  id: string              // 文章唯一标识
  title: string           // 文章标题
  content: string         // 文章内容（包含markdown格式）
  excerpt: string         // 文章摘要
  cover?: string          // 文章封面图（可选）
  category: string        // 文章分类
  tags: string[]          // 文章标签
  date: string            // 发布日期
  author: string          // 作者
}
```

### 2.2 博客 Store 状态

**文件位置**: `src/stores/blog.ts`

```typescript
interface BlogStoreState {
  articles: Article[]      // 文章列表
  categories: string[]     // 分类列表
  loading: boolean         // 加载状态
  error: string | null     // 错误信息
}
```

### 2.3 博客 Store Getters

- `getArticleById`: 根据ID获取单篇文章
- `getArticlesByCategory`: 根据分类获取文章列表
- `getRecentArticles`: 获取最新的5篇文章

### 2.4 博客 Store Actions

- `fetchArticles`: 从JSON文件加载文章数据

## 3. 组件数据结构

### 3.1 InfoCard 组件

**文件位置**: `src/components/cards/InfoCard.vue`

- **数据源**: `blogConfig`
- **使用字段**: `site.title`, `site.description`, `theme.cardOpacity`, `theme.cardOpacityHover`, `theme.borderOpacity`

### 3.2 CategoryCard 组件

**文件位置**: `src/components/cards/CategoryCard.vue`

- **Props**:
  ```typescript
  interface CategoryCardProps {
    categories: string[]  // 分类列表数组
  }
  ```
- **Emits**:
  ```typescript
  interface CategoryCardEmits {
    'category-click': [categoryId: string]  // 点击分类时触发
  }
  ```
- **使用配置**: `theme.cardOpacity`, `theme.cardOpacityHover`, `theme.borderOpacity`

### 3.3 RecentArticlesCard 组件

**文件位置**: `src/components/cards/RecentArticlesCard.vue`

- **内部接口定义**:
  ```typescript
  interface Article {
    id: string
    title: string
    date?: string
  }
  ```
- **Props**:
  ```typescript
  interface RecentArticlesCardProps {
    articles: Article[]  // 文章列表
  }
  ```
- **使用配置**: `theme.cardOpacity`, `theme.cardOpacityHover`, `theme.borderOpacity`
- **内部方法**: `formatDate(dateString: string): string` - 日期格式化函数

### 3.4 LinksCard 组件

**文件位置**: `src/components/cards/LinksCard.vue`

- **数据源**: `blogConfig.social`
- **使用字段**: `social.github`, `social.twitter`, `social.weibo`, `social.wechat`
- **使用配置**: `theme.cardOpacity`, `theme.cardOpacityHover`, `theme.borderOpacity`

### 3.5 Sidebar 组件

**文件位置**: `src/components/Sidebar.vue`

- **功能**: 整合各个卡片组件，提供侧边栏功能
- **子组件**: InfoCard, CategoryCard, RecentArticlesCard, LinksCard
- **数据流**: 
  - 从store获取categories和recentArticles数据
  - 将数据传递给相应的卡片组件
  - 处理CategoryCard触发的category-click事件并进行路由导航

## 4. 数据流向

1. **配置数据**:
   - 从 `src/config/index.ts` 导出 `blogConfig`
   - 被各个组件和store引用
   - 支持全局主题、布局和功能配置

2. **文章数据**:
   - 存储在 `src/data/articles.json` 中，采用JSON格式
   - 通过 `useBlogStore` 的 `fetchArticles` action 加载到store
   - 通过store的getters提供给各个组件
   - 文章数据包含完整的markdown内容和元数据

3. **分类数据**:
   - 由store从文章数据中动态提取（使用Set去重）
   - 通过getter提供给Sidebar组件，再传递给CategoryCard
   - 组件通过emit事件将用户点击分类操作通知父组件

4. **组件通信**:
   - 父组件通过props向子组件传递数据
   - 子组件通过emit向父组件发送事件
   - 组件通过Vue Router进行路由导航
   - 卡片组件直接使用blogConfig中的配置项

## 5. 数据交互示例

### 5.1 文章加载流程

1. 应用初始化时调用 `useBlogStore().fetchArticles()`
2. 从 `articles.json` 加载文章数据
3. 解析文章并提取分类信息
4. 更新store状态
5. 组件通过getters获取所需数据并渲染

### 5.2 分类点击交互

1. 用户点击CategoryCard中的分类项
2. 触发 `category-click` 事件并传递分类ID
3. 父组件（通常是Sidebar）处理该事件
4. 调用router导航到对应分类页面

## 6. 数据类型一致性

- 文章数据在store和组件中的接口定义保持一致
- 配置项使用统一的命名规范和结构
- 所有组件的props和emits都有明确的类型定义

## 7. 未来可扩展点

1. **文章元数据扩展**:
   - 添加阅读统计、评论数等字段
   - 支持自定义字段

2. **用户系统**:
   - 增加用户认证相关数据结构
   - 支持多作者模式

3. **内容类型**:
   - 除文章外，支持页面、项目等其他内容类型

4. **高级配置**:
   - 添加SEO相关配置
   - 支持自定义插件配置