import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
// @ts-ignore
import Home from '../views/Home.vue'
// @ts-ignore
import ArticleDetail from '../views/ArticleDetail.vue'
// @ts-ignore
import About from '../views/About.vue'
// @ts-ignore
import Category from '../views/Category.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/article/:id([\w-]+)',
    name: 'ArticleDetail',
    component: ArticleDetail,
    props: true
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/category/:name',
    name: 'Category',
    component: Category,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router