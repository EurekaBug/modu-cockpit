<template>
  <div>首页</div>
  <el-button v-has-perm="'sys:user:add'" type="primary">添加</el-button>
  <!-- //夜间模式
  <el-button :icon="isDark ? 'Moon' : 'Sunny'" circle @click="toggleDark" /> -->
  <!-- <el-button :icon="Sunny" circle @click="toggleDark" /> -->
  <!-- 主题切换 -->
  <el-switch
    v-model="isDark"
    inline-prompt
    size="large"
    style="--el-switch-on-color: #f2f2f2; --el-switch-off-color: #2c2c2c; --el-switch-border-color: #e4e6ec"
    :active-action-icon="Moon"
    :inactive-action-icon="Sunny"
    @change="toggleDark" />
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
<style lang="scoped">
/* #app > div:nth-child(2) > div.el-switch.el-switch--large.is-checked > span > div.el-switch__action{
  background-color: #2c2c2c;
} */
</style>
