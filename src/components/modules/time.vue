<template>
  <div>
    <el-date-picker v-model="value1" type="date" :placeholder="placeholder" :size="size" />
  </div>
</template>
<script setup>
import { getCurrentInstance, defineProps, ref } from 'vue';
const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },
  placeholder: {
    type: String,
    default: '请选择日期',
  },
});
const { proxy } = getCurrentInstance();
const value1 = ref('');
const size = ref(props.size);
const placeholder = ref(props.placeholder);
</script>
<style lang="scoped"></style>
