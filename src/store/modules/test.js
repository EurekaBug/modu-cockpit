import { defineStore } from 'pinia';

export const useTestStore = defineStore('test', () => {
  const count = ref(0);
  function add() {
    count.value++;
  }
  function $reset() {
    count.value = 0;
  }
  return { count, add, $reset };
});
