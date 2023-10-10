<template>
  <h1>Images</h1>
  <div>
    <div v-for="repository in repositories" :key="repository.name">
      <h3>{{ repository.name }}</h3>
      <ul>
        <li v-for="tag in repository.tags" :key="tag">{{ tag }}</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { api_axios } from '../utils/api'

const repositories = ref([]);

(async () => {
  const qwq = await api_axios.get('/registry/v2/_catalog');

  if (qwq.status === 200) {
    for (let x of qwq.data.repositories) {
      const tag = await api_axios.get('/registry/v2/' + x + '/tags/list');
      repositories.value.push({
        name: x,
        tags: tag.data.tags
      });
    }
  }
})();
</script>
