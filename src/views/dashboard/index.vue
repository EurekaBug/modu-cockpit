<template>
  <div class="dashboard">
    <!-- 顶栏 -->
    <div class="top">
      <div class="left">
        <div class="home">
          <el-button :icon="House" @click="backHome" />
        </div>
      </div>
      <div class="title">Dashboard - {{ num }}</div>
      <div class="right">
        <div class="avatar">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <div class="flex-center-center">
              <el-avatar class="" :size="32" src="/avatar.jpg" />
              <div class="flex-center-center">
                <span class="m-l-6"> {{ userObj.nickname }} </span>
                <el-icon :size="20" style="width: 20px">
                  <ArrowDown />
                </el-icon>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <router-link to="/">
                  <el-dropdown-item>首页</el-dropdown-item>
                </router-link>
                <router-link to="/system/personal-center">
                  <el-dropdown-item>个人中心</el-dropdown-item>
                </router-link>
                <a target="_blank" href="https://github.com/GhostSugar111">
                  <el-dropdown-item>Github</el-dropdown-item>
                </a>
                <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <div class="dark">
          <el-switch
            v-model="isDark"
            size="large"
            inline-prompt
            style="--el-switch-on-color: #2c2c2c; --el-switch-border-color: #e4e6ec"
            :active-icon="Moon"
            :inactive-icon="Sunny"
            @change="toggleDark" />
        </div>
      </div>
    </div>
    <!-- 主体 -->
    <div class="bottom">
      <!-- 侧边栏 -->
      <div class="left">
        <div class="left-top" :style="{ 'background-color': isDark ? '#2c2c2c' : '#F2F3F5' }">组件</div>
        <div class="left-bottom">
          <div class="sidebar">
            <el-menu
              default-active="chart"
              :collapse="false"
              :collapse-transition="false"
              :unique-opened="true"
              :background-color="isDark ? '#2c2c2c' : '#F2F3F5'"
              :text-color="isDark ? '#fff' : '#606266'"
              :active-text-color="isDark ? '#fff' : '#409eff'">
              <el-menu-item index="chart" @click="changeSidebar('chart')" class="el-menu-item">
                <el-icon :size="20">
                  <Histogram />
                </el-icon>
                <div style="height: 20px">图表</div>
              </el-menu-item>
              <el-menu-item index="container" @click="changeSidebar('container')">
                <el-icon :size="20">
                  <Grid />
                </el-icon>
                <span>容器</span>
              </el-menu-item>
            </el-menu>
          </div>
          <div class="sidebar-sub">
            <el-menu
              default-active="所有"
              :collapse="false"
              :collapse-transition="false"
              :unique-opened="true"
              :background-color="isDark ? '#2c2c2c' : '#fff'"
              :text-color="isDark ? '#fff' : '#606266'"
              :active-text-color="isDark ? '#fff' : '#409eff'">
              <el-menu-item v-for="(item, index) in subSidebar[sidebar_current]" :key="index" :index="item">{{ item }}</el-menu-item>
            </el-menu>
            <!-- <div class="sub-item" v-for="(item, index) in subSidebar[sidebar_current]" :key="index">{{ item }}</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { Moon, Sunny, House } from '@element-plus/icons-vue';
import { useDark, useToggle } from '@vueuse/core';
const { proxy } = getCurrentInstance();
const isDark = useDark();
const toggleDark = useToggle(isDark);
const num = 1;
let useUserStore = proxy.$store.user.useUserStore();
let { logout } = useUserStore;
let { userObj } = toRefs(useUserStore);
const backHome = () => {
  proxy.$router.push('/test');
};
let sidebar_current = $ref('chart');
const subSidebar = {
  chart: ['所有', '柱状图', '折线图', '饼图', '雷达图', '地图', '更多'],
  layout: ['所有', 'grid', 'flex', '水平布局', '垂直布局', '更多'],
  container: ['所有', 'flex容器', 'grid容器', '更多'],
};
/* 改变侧栏 */
const changeSidebar = (val) => {
  sidebar_current = val;
};
</script>
<style lang="scss" scoped>
.dashboard {
  .top {
    height: 60px;
    display: flex;
    .left {
      display: flex;
      align-items: center;
      .home {
        margin-left: 20px;
      }
    }
    .title {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .right {
      display: flex;
      flex-flow: row-reverse;
      align-items: center;
      // justify-content: space-between;
      .avatar {
        margin-right: 20px;
        cursor: pointer;
      }
      .dark {
        margin-right: 20px;
      }
    }
  }
  .bottom {
    height: calc(100vh - 60px);
    // background: #f5f7fa;
    display: flex;
    .left {
      width: 400px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      .left-top {
        height: 60px;
        line-height: 60px;
        padding-left: 20px;
        font-size: 16px;
        font-weight: 600;
        // color: #303133;
      }
      .left-bottom {
        height: calc(100vh - 120px);
        display: flex;
        .sidebar {
          // height: auto;
          .el-menu-item {
            // display: flex;
            // justify-content: center;
            height: 80px;
            padding-top: 10px;
            flex-direction: column;
          }
        }
        .sidebar-sub {
          flex: 1;
          // background: #f5f7fa;
        }
      }
    }
  }
}
</style>
