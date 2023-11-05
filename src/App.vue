<template>
  <div>{{ num }}</div>
  <button @click="plus">click</button>
</template>
<script setup>
// import { ref } from 'vue';
let num = $ref(0);
const plus = () => {
  num++;
};
</script>

<style scoped></style>
