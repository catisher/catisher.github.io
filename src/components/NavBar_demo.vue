<script lang="ts" setup>
import { ref } from 'vue'
import { blogConfig } from '../config'

const activeIndex = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<template>
    <header class="navbar">
        <nav> 
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                :ellipsis="false"
                @select="handleSelect"
            >
                <router-link to="/" class="logo">
                    <el-menu-item index="0">

                    <img
                        style="width: 100px"
                        src=""
                        alt=""
                    />{{ blogConfig.site.name }}

                    </el-menu-item>
                </router-link>
        
                <router-link to="/" class="nav-item">
                    <el-menu-item index="1">首页</el-menu-item>
                </router-link>

                <router-link to="/about" class="nav-item">
                    <el-menu-item index="2">关于</el-menu-item>
                </router-link>

            </el-menu>
        </nav>
    </header>
</template>



<style scoped>
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}


</style>

