<script setup lang="ts">
// 导入Vue
import { ref } from 'vue'

// 定义一个响应式的变量，用来控制submenu的展开状态
const open = ref(false)

// 定义一个方法，用来切换submenu的展开状态
const toggle = () => {
  open.value = !open.value
}

</script>

<template>
  <div class="main-header">
    <nav class="navbar">
      <!-- 使用ul和li来创建一个水平的菜单 -->
      <ul class="menu">
        <li class="menu-item"><a href="/">Home</a></li>
        <li class="menu-item"><a href="/workspace">Workspaces</a></li>
        <li class="menu-item"><a href="/images">Images</a></li>
        <li class="menu-item"><a href="/stat">Stat</a></li>
        <!-- 使用一个带有箭头的li来创建一个可展开的submenu -->
        <li class="menu-item submenu" @click="toggle">
          <a href="#">User</a>
          <span class="arrow" :class="{ open }"></span>
          <!-- 使用一个隐藏的ul来创建submenu的内容 -->
          <ul class="submenu-content" v-show="open">
            <li class="submenu-item"><a href="#">Profile</a></li>
            <li class="submenu-item"><a href="#">Settings</a></li>
            <li class="submenu-item"><a href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style>
/* 定义navbar的样式 */
.navbar {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 60px;
  background-color: #333;
  display: flex;
  align-items: center;
}

.main-header {
  height: 60px;
}

/* 定义menu的样式 */
.menu {
  list-style: none;
  display: flex;
  margin-left: 20px;
}

/* 定义menu-item的样式 */
.menu-item {
  position: relative;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
}

/* 定义submenu的样式 */
.submenu {
  display: flex;
  align-items: center;
}

/* 定义arrow的样式 */
.arrow {
  width: 10px;
  height: 10px;
  margin-left: 5px;
  border-top: 2px solid white;
  border-right: 2px solid white;
  transform: rotate(45deg);
  transition: transform 0.3s;
}

/* 定义arrow的展开状态的样式 */
.arrow.open {
  transform: rotate(-135deg);
}

/* 定义submenu-content的样式 */
.submenu-content {
  position: absolute;
  list-style: none;
  top: 100%;
  left: 0;
  width: 200px;
  background-color: #333;
}

/* 定义submenu-item的样式 */
.submenu-item {
  padding: 10px;
  color: white;
  cursor: pointer;
}

/* 定义submenu-item的悬停状态的样式 */
.submenu-item:hover {
  background-color: #444;
}
</style>
