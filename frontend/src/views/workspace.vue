<template>
  <div>
    <Instance v-if="workspaceId"></Instance>
    <Untitled v-else></Untitled>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import Instance from './workspace-instance.vue'
import Untitled from './workspace-untitled.vue'

import { useRouter } from 'vue-router';

const router = useRouter();
const workspaceId = ref('');

// 从url中获取workspaceId
if (router.currentRoute.value.params.workspaceId) {
  workspaceId.value = router.currentRoute.value.params.workspaceId;
}
</script>
