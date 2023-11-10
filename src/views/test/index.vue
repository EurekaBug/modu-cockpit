<template>
  <h1>组件测试</h1>
  <div>
    <Time />
    <Time size="large" placeholder="large" />
    <Time size="small" placeholder="small" />
  </div>
</template>
<script setup>
import { getCurrentInstance } from 'vue';
import Time from '@/components/modules/time.vue';
const { proxy } = getCurrentInstance();
</script>
<style lang="scoped"></style>
