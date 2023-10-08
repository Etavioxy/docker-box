<template>
  
  <button @click="getList">Get Workspace List</button>
  <button @click="createWorkspace">Create Workspace</button>

  <ul>
    {{list}}
  </ul>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from 'axios'
import {api_axios} from '../utils/api'

const list = ref([]);

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

const createWorkspace = async () => {
  // 定义一个要传递给api_axios.post方法的参数对象
  const params = {
    name: 'My Workspace',
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

</script>
