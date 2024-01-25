<template>
  <div class="file-manager">
    <h1>
      <a :href="'/'+workspace+parentsPath[i-1]" v-for="i in parents.length - 1">{{parents[i-1]}} / </a>
      <span>{{parents[parents.length - 1]}} / </span>
    </h1>
    <h2>(webdav)</h2>
    <div class="toolbar">
      <button @click="selectAll">全选</button>
      <button @click="unselectAll">取消全选</button>
      <button @click="deleteSelected">删除选中</button>
      <button @click="uploadFile">上传文件</button>
      <button @click="copyClipboard">复制到剪贴板</button>
      <button @click="clearClipboard">清空剪贴板</button>
      <button @click="pasteClipboard">从剪贴板粘贴</button>
      <button @click="moveClipboard">从剪贴板移动</button>
    </div>
    <div class="file-list">
      <table>
        <thead>
          <tr>
            <th><input type="checkbox" v-model="allChecked" @change="toggleAll"></th>
            <th>文件名</th>
            <th>大小</th>
            <th>修改时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="folder in folders" :key="folder.name">
            <td></td>
            <FMfolder :folder='folder'></FMfolder>
            <td></td>
          </tr>
          <tr v-for="file in files" :key="file.name">
            <td><input type="checkbox" v-model="file.checked"></td>
            <FMfile :file='file'></FMfile>
            <td>
              <button @click="downloadFile(file)">下载</button>
              <button @click="renameFile(file)">重命名</button>
              <button @click="deleteFile(file)">删除</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="clipboard">
      <div v-for="x in clipboardStore.clipboard">{{x}}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FMfile from "./FMfile.vue";
import FMfolder from "./FMfolder.vue";

import { defineComponent, ref, reactive, computed, watchEffect } from "vue";
import { api_axios as axios } from '../utils/api'
import { useClipboardStore } from '../pinia/clipboardStore';

const props = defineProps(['workspace', 'path']);

const parents = [''].concat(props.path.split('/').slice(0,-1));

const parentsPath = parents.slice(1).reduce((x,y)=>{x.push(x[x.length-1]+y+'/'); return x;}, ['/']);

//console.log(props);
//console.log(parents);

const clipboardStore = useClipboardStore();

// 例如：获取 clipboard 的值

//clipboardStore.setClipboard();

// name: "FileManager",

// 列表
const files = reactive<Array<{ name: string; size: number; type: string; lastModified: string; checked: boolean }>>([]);
const folders = reactive<Array<{ name: string; lastModified: string; }>>([]);

// 全选状态
const allChecked = computed(() => files.every((file) => file.checked));

// 获取文件列表
const getFileList = async () => {
  try {
    const response = await axios({
      method: "PROPFIND",
      url: ["/webdav", props.workspace, props.path].join('/'),
      headers: {
        Depth: 1,
      },
    });

    if (response.status === 207) {
      // 解析xml响应
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response.data, "text/xml");
      const responses = xmlDoc.getElementsByTagName("D:response");
      // 清空文件列表
      files.splice(0, files.length);
      folders.splice(0, folders.length);
      // 遍历响应节点，提取文件信息
      for (let i = 1; i < responses.length; i++) {
        const href = responses[i].getElementsByTagName("D:href")[0].textContent as string;
        // 判断节点是否为文件夹
        const isCollection = responses[i].getElementsByTagName("D:collection").length > 0;
        if (isCollection) {
          // 处理文件夹
          const tmpParts = href.split("/");
          const name = decodeURI(tmpParts[tmpParts.length - 2] || "") + "/";
          const lastModified = responses[i].getElementsByTagName("D:getlastmodified")[0]?.textContent || "";
          folders.push({ name, lastModified });
        } else {
          // 处理文件
          const name = decodeURI(href.split("/").pop() || "");
          const size = Number(responses[i].getElementsByTagName("D:getcontentlength")[0]?.textContent || 0);
          const lastModified = responses[i].getElementsByTagName("D:getlastmodified")[0]?.textContent || "";
          files.push({ name, size, lastModified, checked: false });
        }
      }
      //console.log("Files:", files);
      //console.log("Folders:", folders);
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      // 处理404错误
      alert(404);
    } else {
      console.error(error);
    }
  }
};

// 全选或取消全选
const toggleAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked;
  files.forEach((file) => (file.checked = checked));
};

// 选择或取消选择
const selectFile = (file: { name: string; size: number; lastModified: string; checked: boolean }) => {
  file.checked = !file.checked;
};

// 全选
const selectAll = () => {
  files.forEach((file) => (file.checked = true));
};

// 取消全选
const unselectAll = () => {
  files.forEach((file) => (file.checked = false));
};

// 删除选中的文件
const deleteSelected = async () => {
  const selectedFiles = files.filter((file) => file.checked);
  if (selectedFiles.length > 0) {
    if (confirm(`确定要删除选中的${selectedFiles.length}个文件吗？`)) {
      try {
        await Promise.all(
          selectedFiles.map((file) =>
            axios({
              method: "DELETE",
              url: `/webdav/${props.workspace}/${props.path}${file.name}`,
            })
          )
        );
        // 刷新文件列表
        await getFileList();
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    alert("请先选择要删除的文件");
  }
};

// 删除单个文件
const deleteFile = async (file: { name: string; size: number; lastModified: string; checked: boolean }) => {
  if (confirm(`确定要删除${file.name}吗？`)) {
    try {
      await axios({
        method: "DELETE",
        url: `/webdav/${props.workspace}/${props.path}${file.name}`,
      });
      // 刷新文件列表
      await getFileList();
    } catch (error) {
      console.error(error);
    }
  }
};

// 上传文件
const uploadFile = async () => {
  const input = document.createElement("input");
  input.type = "file";
  input.onchange = async () => {
    if (input.files) {
      try {
        for (const file of input.files) {
          //const formData = new FormData();
          //formData.append("file", file);
					//console.log(formData);
          await axios({
            method: "PUT",
            url: `/webdav/${props.workspace}/${props.path}${file.name}`,
            data: file,
          });
        }
        // 刷新文件列表
        await getFileList();
      } catch (error) {
        console.error(error);
      }
    }
  };
  input.click();
};

// 下载文件
const downloadFile = async (file: { name: string; size: number; lastModified: string; checked: boolean }) => {
  try {
    const response = await axios({
      method: "GET",
      url: `/webdav/${props.workspace}/${props.path}${file.name}`,
      responseType: "blob",
    });
    const blob = new Blob([response.data]);
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
  } catch (error) {
    console.error(error);
  }
};

// 重命名文件
const renameFile = async (file: { name: string; size: number; lastModified: string; checked: boolean }) => {
  const newName = prompt("请输入新的文件名", file.name);
  if (newName && newName !== file.name) {
    try {
      await axios({
        method: "MOVE",
        url: `/webdav/${props.workspace}/${props.path}${file.name}`,
        headers: {
          Destination: `/${props.workspace}/${props.path}${newName}`,
        },
      });
      // 刷新文件列表
      await getFileList();
    } catch (error) {
      console.error(error);
    }
  }
};

// 挂载时获取文件列表
watchEffect(() => {
  getFileList();
});

// 从剪贴板中复制文件或文件夹
const copyClipboard = () => {
  const selectedFiles = files.filter((file) => file.checked);
  try {
    clipboardStore.push(
      selectedFiles.map(file => 
        ({path: props.path, name: file.name, type: file.type})
      )
    );
  } catch (error) {
    console.error(error);
  }
};

const clearClipboard = () => {
  try {
    clipboardStore.clear();
  } catch (error) {
    console.error(error);
  }
};

// 粘贴剪贴板中的文件或文件夹到当前文件夹
const pasteClipboard = async () => {
  let tmpClipboard = clipboardStore.clipboard;
  if (tmpClipboard.length === 0) {
    alert("剪贴板为空");
    return;
  }

  try {
    await Promise.all(
      tmpClipboard.map((item) => {
        const destination = `/${props.workspace}/${props.path}${item.name}`;
        if (item.type !== "collection") {
          // 复制文件
          return axios({
            method: "COPY",
            url: `/webdav/${props.workspace}/${item.path}${item.name}`,
            headers: {
              Destination: destination,
              Overwrite: 'F'
            },
          });
        } else {
          // 复制文件夹
          return axios({
            method: "COPY",
            url: `/webdav/${props.workspace}/${item.path}`,
            headers: {
              Destination: destination,
              Depth: 1,
            },
          });
        }
      })
    );

    // 刷新文件列表
    await getFileList();
  } catch (error) {
    console.error(error);
  }
};

// 移动剪贴板中的文件或文件夹到当前文件夹
const moveClipboard = async () => {
  let tmpClipboard = clipboardStore.clipboard;
  if (tmpClipboard.length === 0) {
    alert("剪贴板为空");
    return;
  }

  try {
    await Promise.all(
      tmpClipboard.map((item) => {
        const destination = `/${props.workspace}/${props.path}${item.name}`;
        if (item.type !== "collection") {
          // 移动文件
          return axios({
            method: "MOVE",
            url: `/webdav/${props.workspace}/${item.path}${item.name}`,
            headers: {
              Destination: destination,
            },
          });
        } else {
          // 移动文件夹
          return axios({
            method: "MOVE",
            url: `/webdav/${props.workspace}/${item.path}${item.name}`,
            headers: {
              Destination: destination,
              Depth: 1,
            },
          });
        }
      })
    );

    // 刷新文件列表
    await getFileList();
  } catch (error) {
    console.error(error);
  }
};
</script>

<style>
.file-manager {
  width: 800px;
  margin: 0 auto;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.file-list {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
}
</style>

