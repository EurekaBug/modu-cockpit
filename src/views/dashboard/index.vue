<template>
  <!-- 主题切换 -->
  <el-row>
    <div class="title">主题转换：</div>
    <el-switch v-model="isDark" size="large" inline-prompt style="--el-switch-on-color: #2c2c2c; --el-switch-border-color: #e4e6ec" :active-icon="Moon" :inactive-icon="Sunny" @change="toggleDark" />
  </el-row>
</template>
<script setup>
import { Moon, Sunny } from '@element-plus/icons-vue';
import 'element-plus/theme-chalk/dark/css-vars.css';
import { getCurrentInstance } from 'vue';
import { useDark, useToggle } from '@vueuse/core';
const { proxy } = getCurrentInstance();
const isDark = useDark();
const toggleDark = useToggle(isDark);
//改变主题
// const { theme } = ref('false');
// const isDark = useDark({
//   // 存储到localStorage/sessionStorage中的Key 根据自己的需求更改
//   storageKey: 'useDarkKEY',
//   // 暗黑class名字
//   valueDark: 'dark',
//   // 高亮class名字
//   valueLight: 'light',
// });
</script>
<style lang="scss" scoped>
.title {
  //垂直居中
  line-height: 40px;
  margin-left: 10px;
  font-size: 16px;
  color: #606266;
}
</style>
