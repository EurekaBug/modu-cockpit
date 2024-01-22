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
              <el-avatar class="" :size="32" :src="userObj.avatarUrl" />
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
    <div class="bottom"></div>
  </div>
</template>
<script setup>
import { Moon, Sunny, House } from '@element-plus/icons-vue';
import { getCurrentInstance, toRefs } from 'vue';
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
      }
      .dark {
        margin-right: 20px;
      }
    }
  }
  .bottom {
    height: calc(100vh - 50px);
    background: #f5f7fa;
  }
}
</style>
