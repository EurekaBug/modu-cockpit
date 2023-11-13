<template>
  <div>
    <el-date-picker v-model="value1" :type="type" :placeholder="placeholder" :size="size" />
  </div>
</template>
<script setup>
import { getCurrentInstance, defineProps, ref, toRefs, computed } from 'vue';
const props = defineProps({
  size: {
    type: String,
    default: 'default',
  },
  type: {
    type: String,
    default: 'date',
  },
});
const { proxy } = getCurrentInstance();
const value1 = ref('');
const { size, type } = toRefs(props);
const placeholder = computed(() => {
  if (type.value == 'date') {
    return '请选择日期';
  } else if (type.value === 'year') {
    return '请选择年份';
  } else if (type.value === 'month') {
    return '请选择月份';
  } else if (type.value === 'week') {
    return '请选择周';
  } else {
    return '请选择';
  }
});
</script>
<style lang="scoped"></style>
