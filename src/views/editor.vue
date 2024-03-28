<template>
    <div class="app">
        <Editor v-model="state" :formData="formData" />
    </div>
</template>
<script setup>
import data from '@/components/data.json';
import Editor from '@/packages/editor';
import { provide } from 'vue';
import { registerConfig as config } from '../utils/editor-config';
const state = $ref(data);
provide('config', config); // 为子组件提供配置
const formData = ref({
    username: 'admin',
    password: 123,
    start: 0,
    end: 100,
});
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
