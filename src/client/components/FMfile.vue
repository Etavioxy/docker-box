<template>
  <td>{{ file.name }}</td>
  <td>{{ prettyBytes(file.size) }}</td>
  <td>{{ humanizedLastModified }}</td>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import prettyBytes from 'pretty-bytes';
import moment from 'moment';

const props = defineProps(['file']);

const humanizedLastModified = computed(() => {
  const date = moment(props.file.lastModified, 'ddd, DD MMM YYYY HH:mm:ss [GMT]');
  return date.fromNow();
});
</script>
