<template>
  <div>
    <router-view></router-view>
    <!-- <Instance v-if="workspaceId"></Instance> -->
    <!-- <Untitled v-else></Untitled> -->
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

import { useRouter } from 'vue-router';

const router = useRouter();
const workspaceId = ref('');

// 从url中获取workspaceId
if (router.currentRoute.value.params.workspaceId) {
  workspaceId.value = router.currentRoute.value.params.workspaceId;
}
</script>
