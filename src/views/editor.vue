<template>
  <div class="app">
    <Editor :data="state" />
  </div>
</template>
<script setup>
import data from '@/components/data.json';
import Editor from '@/packages/editor';
const state = $ref(data);
</script>
<style scoped lang="scss">
.app {
  position: fixed;
  top: 20px;
  bottom: 20px;
  left: 20px;
  right: 20px;
}
</style>
