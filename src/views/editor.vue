<template>
    <div class="app">
        <Editor v-model="state" />
    </div>
</template>
<script setup>
import data from '@/components/data.json';
import Editor from '@/packages/editor';
import { provide } from 'vue';
import { registerConfig as config } from '../utils/editor-config';
const state = $ref(data);
provide('config', config); // 为子组件提供配置
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
