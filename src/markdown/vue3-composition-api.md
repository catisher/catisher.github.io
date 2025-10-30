---
title: 'Vue 3 组合式API详解'
category: '前端'
tags: ['Vue3', '组合式API', 'JavaScript']
date: '2024-01-15'
author: '张三'
cover: ''
---

# Vue 3 组合式API详解

Vue 3 引入了组合式API，这是一个全新的API设计，让我们能够更好地组织组件逻辑，提高代码复用性。

## 为什么需要组合式API？

在Vue 2中，我们使用选项式API（Options API）来组织组件代码。这种方式在组件变得复杂时，相关的逻辑会分散在不同的选项中，使得代码难以理解和维护。

组合式API通过将相关的逻辑组织在一起，解决了这个问题。

## setup函数

`setup`函数是组合式API的入口点：

```javascript
import { ref, onMounted } from 'vue'

export default {
  setup() {
    const count = ref(0)
    
    function increment() {
      count.value++
    }
    
    onMounted(() => {
      console.log('组件已挂载')
    })
    
    return {
      count,
      increment
    }
  }
}
```

## 响应式引用

`ref`和`reactive`是创建响应式数据的两种方式：

- `ref`用于创建响应式的基本类型值
- `reactive`用于创建响应式的对象

## 生命周期钩子

组合式API提供了与选项式API对应的生命周期钩子函数，只是名称前多了一个`on`前缀：

- `onMounted`
- `onUpdated`
- `onUnmounted`
- 等等

## 总结

组合式API为Vue开发提供了更灵活、更强大的方式来组织和复用代码。它特别适合处理复杂的组件逻辑，让我们的代码更加清晰和可维护。