<template>
  <h1>{{workspaceName}}</h1>
  <div>
    <label for="command">选择命令：</label>
    <select id="command" v-model="selectedCommand">
      <option v-for="option in commandOptions" :value="option.value">
        {{ option.value }} {{ option.tag }}
      </option>
    </select>
    <label for="dir">目录：</label>
    <input id="dir" type="text" v-model="dir" />
    <label for="arg">参数：</label>
    <input id="arg" type="text" v-model="arg" />
    <button @click="sendCommand">Run</button>
  </div>
  <div class="workspace-container" flex="">
    <FileManager ref="fileManagerRef" :workspace="'workspace/'+workspaceId" :path="path"></FileManager>
    <div w-lg bg-blue border-1px border-color-red>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import FileManager from '../components/FileManager.vue'
import { api_axios } from '../utils/api'
import { ref, reactive, onMounted } from 'vue'

const props = defineProps(['workspaceId', 'path']);

const fileManagerRef = ref<any>();

const workspaceName = ref('');

interface CommandOption {
  tag: string;
  value: string;
}

const commandOptions = reactive([] as CommandOption[]);

const getWorkspaceInfo = async () => {
  const response = await api_axios.get(`/workspace/${props.workspaceId}`);
  workspaceName.value = response.data.name;
}

const getCommandOptions = async () => {
  commandOptions.splice(0);

  const catalog = await api_axios.get('/registry/v2/_catalog');
  if (catalog.status !== 200) return [];
  const repositories = await Promise.all(catalog.data.repositories.map(
    async (image: string) => {
      const res = await api_axios.get('/registry/v2/' + image + '/tags/list');
      return {
        name: image,
        tags: res.data.tags,
      };
    }
  ));

  repositories.forEach((x) => { 
    let value = x.name;
    x.tags.forEach((tag: string) => {
      commandOptions.push({ tag, value });
    })
  });
  //debug
  commandOptions.push({ tag:'latest', value:'pic2pdf' });
}

onMounted(async () => {
  getWorkspaceInfo();
  getCommandOptions();
})

const selectedCommand = ref('');

const dir = ref('');
const arg = ref('');

const sendCommand = async () => {
  const url = `/workspace/${props.workspaceId}/command/${selectedCommand.value}`;

  const payload = {
    dir: dir.value,
    arg: arg.value,
  };

  try {
    const response = await api_axios.post(url, payload);
    console.log(response.data);
    fileManagerRef.value.getFileList();
  } catch (error) {
    console.error(error);
  }
};

</script>
