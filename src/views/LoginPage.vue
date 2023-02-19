<script setup lang="ts">
import router from "@/router";
import { reactive } from "vue";
interface LoginType {
  user: string;
  password: string;
}
const formInline = reactive<LoginType>({
  user: "",
  password: "",
});

const onLogin = () => {
  router.push("/rep/home");
};
</script>
<template>
  <el-form label-position="left" :model="formInline" class="form">
    <el-form-item label="账号">
      <el-input v-model="formInline.user" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="formInline.password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button class="loginButton" type="primary" @click="onLogin">登录</el-button>
    </el-form-item>
  </el-form>
</template>

<style lang="scss" scoped>
.form {
  width: 20rem;
}

.loginButton {
  margin: 0 auto;
  width: 10rem;
}
// @media (max){

// }
</style>
