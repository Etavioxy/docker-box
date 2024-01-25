<template>
  <FileManager :workspace="'workspace/'+workspaceId" :path="path"></FileManager>
</template>

<script setup lang="ts">
import FileManager from '../components/FileManager.vue'

const _props = defineProps(['workspaceId', 'path']);

</script>
