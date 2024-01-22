<template>
  <div class="test">
    <h1>组件测试</h1>
    <h2>Date组件</h2>
    <el-row>
      <el-col :span="6">
        <p>设置尺寸大小：</p>
        <el-radio-group v-model="dateSize" label="size control" size="small">
          <el-radio-button label="large">large</el-radio-button>
          <el-radio-button label="default">default</el-radio-button>
          <el-radio-button label="small">small</el-radio-button>
        </el-radio-group>
        <p>设置type：</p>
        <el-radio-group v-model="dateType" label="size control" size="small">
          <el-radio-button label="year">year</el-radio-button>
          <el-radio-button label="month">month</el-radio-button>
          <el-radio-button label="week">week</el-radio-button>
          <el-radio-button label="date">date</el-radio-button>
        </el-radio-group>
        <!-- <Date size="large" placeholder="large" />
        <Date size="small" placeholder="small" /> -->
      </el-col>
      <el-col :span="6">
        <p>展示：</p>
        <Date :size="dateSize" :type="dateType" />
      </el-col>
    </el-row>
    <h2>Table组件</h2>
    <el-row>
      <el-col :span="6"
        ><div />
        <p>默认：</p>
        <Table />
      </el-col>
    </el-row>
    <h1>功能测试</h1>
    <!-- 主题切换 -->
    <el-row>
      <div class="title">主题转换：</div>
      <el-switch v-model="isDark" size="large" inline-prompt style="--el-switch-on-color: #2c2c2c; --el-switch-border-color: #e4e6ec" :active-icon="Moon" :inactive-icon="Sunny" @change="toggleDark" />
    </el-row>
  </div>
</template>
<script setup>
import { getCurrentInstance, ref } from 'vue';
import Date from '@/components/modules/date.vue';
import Table from '@/components/modules/table.vue';
import { useDark, useToggle } from '@vueuse/core';
const { proxy } = getCurrentInstance();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const dateSize = ref('default');
const dateType = ref('date');
</script>
<style lang="scss" scoped>
.test {
  padding: 20px;
  .el-row {
    margin-bottom: 20px;
  }
  .title {
    //垂直居中
    line-height: 40px;
    margin-left: 10px;
    font-size: 16px;
  }
}
</style>
