# 项目目录结构说明

本文档详细说明 Vue 3 + TypeScript + Vite 博客项目的目录结构及各文件/文件夹的作用。

## 项目根目录结构

```
├── .gitignore            # Git忽略文件配置
├── .vscode\              # VSCode编辑器配置目录
│   └── extensions.json   # 推荐的VSCode扩展配置
├── README.md             # 项目说明文档
├── index.html            # 应用入口HTML文件
├── package-lock.json     # npm依赖版本锁定文件
├── package.json          # 项目配置和依赖管理文件
├── public\               # 静态资源目录，不会被构建工具处理
│   └── vite.svg          # Vite默认图标
├── scripts\              # 项目脚本目录
│   └── parse-markdown.js # Markdown解析脚本
├── src\                  # 源代码目录
├── tsconfig.app.json     # TypeScript应用配置
├── tsconfig.json         # 基础TypeScript配置
├── tsconfig.node.json    # Node环境TypeScript配置
└── vite.config.ts        # Vite构建工具配置
```

## src 目录详解

```
src\
├── App.vue               # Vue应用根组件
├── assets\               # 静态资源目录
│   ├── images\           # 图片资源文件夹
│   └── vue.svg           # Vue图标
├── components\           # 可复用组件目录
│   ├── Footer.vue        # 页脚组件
│   ├── HelloWorld.vue    # 示例组件
│   ├── MainContent.vue   # 主内容区域组件
│   ├── NavBar.vue        # 导航栏组件
│   └── Sidebar.vue       # 侧边栏组件
├── config\               # 配置文件目录
│   └── index.ts          # 应用配置，包含主题、透明度等设置
├── data\                 # 数据文件目录
│   └── articles.json     # 文章数据文件
├── main.ts               # 应用入口文件，初始化Vue应用
├── markdown\             # Markdown文章目录
│   ├── pinia-best-practices.md  # Pinia最佳实践文章
│   └── vue3-composition-api.md  # Vue 3组合式API文章
├── router\               # 路由配置目录
│   └── index.ts          # 路由定义和配置
├── stores\               # 状态管理目录
│   └── blog.ts           # 博客相关状态管理
├── style.css             # 全局样式文件
└── views\                # 页面视图组件目录
    ├── About.vue         # 关于页面
    ├── ArticleDetail.vue # 文章详情页面
    ├── Category.vue      # 分类页面
    └── Home.vue          # 首页
```

## 目录结构说明

### 根目录文件
- **.gitignore**: 定义Git版本控制中需要忽略的文件和目录，如node_modules、构建输出等
- **package.json**: 定义项目的名称、版本、依赖包和脚本命令
- **index.html**: 单页应用的HTML入口，包含根元素和标题等基本信息
- **vite.config.ts**: Vite构建工具的配置文件，可以自定义构建流程、插件等
- **tsconfig.json**: TypeScript编译器的基础配置文件

### src 目录核心说明

#### 组件相关
- **components/**: 存放可复用的UI组件，如导航栏、侧边栏、页脚等
- **views/**: 存放页面级组件，每个组件对应一个路由页面
- **App.vue**: 应用的根组件，包含全局布局结构

#### 配置与状态管理
- **config/**: 存放应用配置，如主题颜色、透明度等可配置项
- **router/**: 存放路由配置，定义页面路由映射关系
- **stores/**: 存放状态管理文件，使用Pinia管理全局状态

#### 资源与数据
- **assets/**: 存放图片、图标等静态资源
- **markdown/**: 存放Markdown格式的文章内容
- **data/**: 存放JSON格式的数据文件，如文章元数据等
- **scripts/**: 存放辅助脚本，如Markdown解析器

#### 入口文件
- **main.ts**: 应用的JavaScript入口文件，负责创建Vue应用实例、挂载根组件、引入全局资源等

## 技术栈说明

- **Vue 3**: 前端框架，使用组合式API开发
- **TypeScript**: 为JavaScript添加静态类型检查
- **Vite**: 现代前端构建工具，提供快速的开发体验
- **Pinia**: 轻量级状态管理库，Vue官方推荐的状态管理解决方案
- **Vue Router**: 官方路由管理器，用于构建单页应用

## 项目架构特点

1. **组件化开发**: 将UI拆分为可复用的组件
2. **路由管理**: 通过Vue Router实现页面导航
3. **状态管理**: 使用Pinia管理全局状态
4. **配置集中化**: 所有配置项集中在config目录下
5. **Markdown支持**: 支持Markdown格式的文章内容
6. **TypeScript类型安全**: 全项目使用TypeScript保证代码质量

这个结构设计符合Vue 3 + Vite项目的最佳实践，便于团队协作和项目维护。