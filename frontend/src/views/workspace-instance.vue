<template>
    <input type="file" @change="handleFileUpload" multiple />
    <button @click="getFileList">Get File List</button>
    
    <div>
      <input type="checkbox" v-model="selectAll" @change="toggleSelectAll" />
      <label>Select All</label>
      
      <select v-model="selectedCommand">
        <option value="delete">Delete</option>
        <option value="download">Download</option>
        <!-- 添加其他命令选项 -->
      </select>
      
      <button @click="executeCommand">Execute Command</button>
    </div>
    
  <ul>
    <li v-for="(file, index) in fileList" :key="index">
      <input type="checkbox" v-model="selectedFiles" :value="file.name" />
      {{ file.name }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import axios from 'axios'
import {api_axios} from '../utils/api'

const fileList = ref([]);
const selectedFiles = ref([]);
const selectAll = ref(false);
const selectedCommand = ref('');

// 处理文件上传
const handleFileUpload = async (event) => {
  const files = event.target.files;
  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append('files', files[i]);
  }

  try {
    await api_axios.post(`/workspace/${workspaceId}/file/upload`, formData);
    console.log('Files uploaded successfully');
  } catch (error) {
    console.error('Error uploading files:', error);
  }
};

// 获取文件列表
const getFileList = async () => {
  //try {
    const response = await api_axios.get(`/workspace/${workspaceId}/filelist`);
    fileList.value = response.data;
    console.log(fileList.value)
  //} catch (error) {
  //  console.error('Error getting file list:', error);
  //}
};

// 全选/取消全选
const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedFiles.value = fileList.value.map(file => file.name);
  } else {
    selectedFiles.value = [];
  }
};

// 执行命令
const executeCommand = async () => {
  if (selectedFiles.value.length === 0) {
    console.log('No files selected');
    return;
  }

  try {
    if (selectedCommand.value === 'delete') {
      await Promise.all(selectedFiles.value.map(file => api_axios.delete(`/workspace/${workspaceId}/file/${file}`)));
      console.log('Files deleted successfully');
    } else if (selectedCommand.value === 'download') {
      await Promise.all(selectedFiles.value.map(file => api_axios.get(`/workspace/${workspaceId}/file/download/${file}`)));
      console.log('Files downloaded successfully');
    } else {
      // 添加其他命令的处理逻辑
    }

    // 重新获取文件列表
    getFileList();
  } catch (error) {
    console.error('Error executing command:', error);
  }
};
</script>
