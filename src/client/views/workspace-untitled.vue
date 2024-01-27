<template>
  
  <button @click="getList">Get Workspace List</button>
  <input type="text" v-model="title">
  <button @click="createWorkspace">Create Workspace</button>

  <ul>
    <li v-for="item in list" :key="item.id">
      <p>Name: {{ item.name }}</p>
      <p>User ID: {{ item.user_id }}</p>
      <p>Status: {{ item.status }}</p>
      <p>Created at: {{ item.createdAt }}</p>
      <p>Removed at: {{ item.removedAt }}</p>
      <p>Updated at: {{ item.updatedAt }}</p>
      <button @click="enter(item.id)">enter</button>
    </li>
  </ul>

  <ul>
    <li v-for="item in list" :key="item.id">
      <div style="display: flex; justify-content: space-between;">
        <div>
          <p>Name:</p>
          <p>User ID:</p>
          <p>Status:</p>
          <p>Created at:</p>
          <p>Removed at:</p>
          <p>Updated at:</p>
        </div>
        <div>
          <p>{{ item.name }}</p>
          <p>{{ item.user_id }}</p>
          <p>{{ item.status }}</p>
          <p>{{ item.createdAt }}</p>
          <p>{{ item.removedAt }}</p>
          <p>{{ item.updatedAt }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref } from "vue";
import {api_axios} from '../utils/api'

interface Workspace {
  id: number;
  name: string;
  user_id: number;
  status: string;
  createdAt: string;
  removedAt: string;
  updatedAt: string;
}

const list = ref([] as [Workspace]);

// 获取文件列表
const getList = async () => {
  //try {
    const response = await api_axios.get(`/workspace`);
    list.value = response.data;
    console.log(list.value)
  //} catch (error) {
  //  console.error('Error getting file list:', error);
  //}
};

getList();

const title = ref('');

const createWorkspace = async () => {
  if( !title.value ) return;
  // 定义一个要传递给api_axios.post方法的参数对象
  const params = {
    name: title.value,
  };

  // 尝试调用api_axios.post方法
  try {
    // 如果调用成功，打印响应数据
    const response = await api_axios.post(`/workspace`, params);
    console.log(response.data);
  } catch (error) {
    // 如果调用失败，打印错误信息
    console.error(error.message);
  }
  await getList();
};

import { useRouter } from 'vue-router'
const router = useRouter()

function enter(id: number){
  console.log('enter', id);
  router.push({ path: `/workspace/${id}` })
}

</script>
