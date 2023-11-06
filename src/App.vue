<template>
  <h1>Welcome to Modu-Cockpit!</h1>
  <!-- <p>
    <router-link to="/test">Go to Home</router-link>
    <router-link to="/about">Go to About</router-link>
  </p>
  <router-view> </router-view> -->
  <!-- <h1>{{ $filters.sexName(1) }}</h1> -->
  <!-- <button @click="handleClick">click</button> -->

  <h1>{{ count }}</h1>
  <button @click="handleClick">click</button>
  <br />
  <h1>{{ $store.test.useTestStore().count }}</h1>
  <button @click="$store.test.useTestStore().add">click</button>
  <button @click="clear">click</button>

  <!-- 全局组件 -->
  <base-no-data>组件数据</base-no-data>
  <!-- <button @click="handleClick">click</button>
  <h1>{{ res }}</h1> -->
</template>
<script setup>
import { getCurrentInstance } from 'vue';
import { toRefs } from 'vue';
const { proxy } = getCurrentInstance();
let useTestStore = proxy.$store.test.useTestStore();
let { count } = toRefs(useTestStore); // 响应式

let { add, $reset } = useTestStore;
function handleClick() {
  add();
}
function clear() {
  $reset();
}

// async function handleClick() {
//   proxy.submitOk('保存成功');
//   proxy.submitFail('操作失败');
// }

// let res = $ref(null);

// async function handleClick() {
//   res = await proxy.$api.demo.time();
// }
</script>

<style scoped></style>
