<script setup lang="ts">
import router from "@/router";
import { reactive, toRefs } from "vue";
interface RegisterType {
  user: string;
  passWord: string;
  newPassWord: string;
  email: string;
}
const formInline = reactive<RegisterType>({
  user: "",
  passWord: "",
  newPassWord: "",
  email: "",
});
const { user, passWord, newPassWord, email } = toRefs(formInline);
const onSubmit = () => {
  router.push("/backstage/home");
};
</script>
<template>
  <el-form :model="formInline" class="form">
    <el-form-item label="账号">
      <el-input
        v-model="user"
        type="number"
        max="10"
        placeholder="请输入学号"
      />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="passWord" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="newPassWord" placeholder="请再次输入密码" />
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input
        v-model="email"
        type="email"
        placeholder="目前支持qq、163邮箱"
      />
    </el-form-item>
    <el-form-item>
      <el-button class="registerButton" type="primary" @click="onSubmit"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<style lang="scss">
.form {
  width: 20rem;
}

.registerButton {
  margin: 0 auto;
  width: 10rem;
}
</style>
