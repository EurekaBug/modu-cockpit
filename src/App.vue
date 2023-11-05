<template>
  <h1>Welcome to Modu-Cockpit!</h1>
  <p>
    <router-link to="/test">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view> </router-view>
  <h1>{{ sexList }}</h1>
  <button @click="handleClick">click</button>
</template>
<script setup>
import { getCurrentInstance } from 'vue';
const { proxy } = getCurrentInstance();

async function handleClick() {
  proxy.submitOk('保存成功');
  proxy.submitFail('操作失败');
}
</script>

<style scoped></style>
