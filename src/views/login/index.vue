<template>
  <base-wrapper class="bg-color-primary flex-center-center">
    <div class="flex-c-center-center bg-color-white" style="width: 500px; height: 400px; border-radius: 10px">
      <h1 class="font-size-lg">modu-cockpit</h1>
      <div class="m-t-20">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules">
          <el-form-item>
            <el-input v-model="loginForm.account" prefix-icon="User" placeholder="请输入账号" maxlength="30" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginForm.password" prefix-icon="Lock" placeholder="请输入密码" show-password maxlength="30" />
          </el-form-item>
        </el-form>
        <div class="tips">
          <span>用户名: admin</span>
          <span class="m-l-20"> 密码: w123456</span>
        </div>
        <div>
          <el-button type="primary" class="m-t-10 w-full" @click="handleLogin">登 录</el-button>
        </div>
        <div>
          <el-button class="m-t-10 w-full" @click="dialogVisible = true">注 册</el-button>
        </div>
        <el-dialog v-model="dialogVisible" width="30%" :before-close="handleClose">
          <template #title>
            <div class="flex-center-center">
              <span class="font-size-lg">注 册</span>
            </div>
          </template>
          <template #default>
            <div class="flex-between-center p-x-30 m-t-10">
              <span>用户名：</span>
              <el-popover placement="right" title="用户名" :width="200" trigger="click" content="由5-12位的数字或字母组成">
                <template #reference>
                  <el-input style="width: 300px" v-model="registerForm.account" placeholder="Please input" clearable />
                </template>
              </el-popover>
            </div>
            <div class="flex-between-center p-x-30 m-t-10">
              <span>密码：</span>
              <el-popover placement="right" title="密码" :width="200" trigger="click" content="由开头不能为数字的6-12位的数字或字母组成">
                <template #reference>
                  <el-input style="width: 300px" v-model="registerForm.password" type="password" show-password placeholder="Please input" clearable />
                </template>
              </el-popover>
            </div>
            <div class="flex-between-center p-x-30 m-t-10">
              <span>确认密码：</span>
              <el-input style="width: 300px" v-model="registerForm.cpassword" type="password" show-password placeholder="Please input" clearable />
            </div>
          </template>
          <template #footer>
            <span class="dialog-footer">
              <!-- <el-button @click="dialogVisible = false">Cancel</el-button> -->
              <el-button class="m-r-30" type="primary" @click="handleRegister"> 确认 </el-button>
            </span>
          </template>
        </el-dialog>
      </div>
    </div>
  </base-wrapper>
</template>
<script setup>
import { getCurrentInstance } from 'vue';
import { ElMessageBox } from 'element-plus';
const { proxy } = getCurrentInstance();
const { login, isLogin, register } = proxy.$store.user.useUserStore();
const loginForm = $ref({});
const registerForm = $ref({});
const loginRules = {
  user: [{ required: true, trigger: 'change', message: '请输入账号' }],
  password: [{ required: true, trigger: 'change', validator: validatePassword }],
};
let dialogVisible = $ref(false);
const handleClose = (done) => {
  ElMessageBox.confirm('确定要关闭此窗口吗?')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};
// 在mounted生命周期钩子函数中进行判断
onMounted(() => {
  // 判断条件
  if (isLogin) {
    console.log('已登录');
    proxy.$router.push({ path: '/dashboard' });
  }
});
function validatePassword(rule, value, callback) {
  if (!value || value.length < 6) {
    callback(new Error('密码最少6位'));
  } else {
    callback();
  }
}
function handleLogin() {
  // proxy.$router.push({ path: '/' });
  // console.log('loginForm: ', loginForm);
  //判断loginForm是否为空 如为空提示
  if (!loginForm.account) {
    proxy.$message({
      message: '请输入账号',
      type: 'warning',
    });
    return;
  }
  if (!loginForm.password) {
    proxy.$message({
      message: '请输入密码',
      type: 'warning',
    });
    return;
  }
  login(loginForm).then(() => {
    proxy.$router.push({ path: '/dashboard' });
  });

  // proxy.$refs.loginFormRef.validate((valid) => {
  //   if (valid) {
  //     login(loginForm).then(() => {
  //       let fullPath = proxy.$route.fullPath;
  //       if (fullPath.startsWith('/login?redirect=')) {
  //         let lastPath = fullPath.replace('/login?redirect=', '');
  //         // 跳转到上次退出的页面
  //         proxy.$router.push({ path: lastPath });
  //       } else {
  //         // 跳转到首页
  //         proxy.$router.push({ path: '/' });
  //       }
  //     });
  //   }
  // });
}
function handleRegister() {
  //判断registerForm是否为空 如为空提示
  if (!registerForm.account) {
    proxy.$message({
      message: '请输入账号',
      type: 'warning',
    });
    return;
  }
  if (!registerForm.password) {
    proxy.$message({
      message: '请输入密码',
      type: 'warning',
    });
    return;
  }
  if (!registerForm.cpassword) {
    proxy.$message({
      message: '请确认密码',
      type: 'warning',
    });
    return;
  }
  if (registerForm.password !== registerForm.cpassword) {
    proxy.$message({
      message: '两次密码不一致',
      type: 'warning',
    });
    return;
  }
  register(registerForm).then(() => {
    console.log('注册成功');
    //清空表单
    registerForm.account = '';
    registerForm.password = '';
    registerForm.cpassword = '';
    //关闭弹窗
    dialogVisible = false;
  });
}
</script>
<style lang="scss" scoped>
.copyright {
  width: 100%;
  position: absolute;
  bottom: 0;
  font-size: 12px;
  text-align: center;
  color: #ccc;
}
</style>
