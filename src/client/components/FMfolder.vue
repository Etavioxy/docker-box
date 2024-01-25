<template>
  <td><a :href="folder.name">{{ folder.name }}</a></td>
  <td></td>
  <td>{{ humanizedLastModified }}</td>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import moment from 'moment';

const props = defineProps(['folder']);

const humanizedLastModified = computed(() => {
  const date = moment(props.folder.lastModified, 'ddd, DD MMM YYYY HH:mm:ss [GMT]');
  return date.fromNow();
});
</script>
