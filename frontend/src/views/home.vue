<template>
  <div>
    <a href="/">
      <img w-14em :src="logoURL" alt="" />
    </a>
    <h1>{{ name }}</h1>
    <nav flex-c-b p-1em id="navbar">
      <a 
        v-for="item in navbarItems" :key="item.id"
        c-inherit inline-block 
        m-r-1em p-0.5em rd-0.5em
        bg-dark-600 hover-bg-warmgray-600 
        b-solid b-2 b-emerald-600 
        cursor-pointer
        class="navbar-item"
        :href="item.link"
      >
        {{ item.label }}
      </a>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import config from "../config";

let { name, logoURL } = config;

interface NavbarItem {
  id: number;
  label: string;
}

const navbarItems = reactive([
  { id: 1, label: 'Workspaces', link: '/workspace' },
  { id: 2, label: 'Images', link: '/images' },
  { id: 3, label: 'Stat', link: '/stat' },
  { id: 4, label: 'Login', link: '/login' },
] as NavbarItem[]);

</script>
