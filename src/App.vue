<template>
  <layout />
</template>
<script setup>
import layout from '@/layout/index.vue';
import axios from 'axios';
axios.post('http://localhost:3007/data/compile', {
  filename: 'Counter.vue',
  fileJSON: {
    tag: 'div',
    classes: ['app'],
    children: [
      {
        tag: 'h1',
        props: {
          title: 'Hello, World!',
        },
      },
      {
        tag: 'h2',
        state: {
          count: 150,
        },
      },
      {
        tag: 'h3',
        computed: {
          doubleCount: 'count.value * 2',
        },
      },
      {
        tag: 'button',
        events: {
          click: {
            'handleAddBtnClick($event)': 'count.value += 1',
            'handleLogBtnClick()': "console.log('count.value')",
          },
        },
      },
    ],
  },
});
</script>

<style scoped></style>
