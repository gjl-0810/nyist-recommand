<script setup lang="ts">
import { login } from "@/http/reception";
import router from "@/router";
import { LOGIN_STATUS_MAP } from "@/utils/instance";
import type { FormInstance } from "element-plus/es/components";
import { reactive, ref } from "vue";
interface LoginType {
  username: string;
  password: string;
}

const loginInstance = reactive<LoginType>({
  username: "",
  password: "",
});
const { username, password } = loginInstance;
const formRef = ref<FormInstance>();
const onLogin = (formEl: FormInstance | undefined) => {
  // login({ userName, password }, (res) => {});
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      // login({ username, password }, (res) => {
      //   const {code} = res.data
      //   ElMessage.success(`${LOGIN_STATUS_MAP[code as keyof typeof LOGIN_STATUS_MAP] }`);
      // });
      router.push("/rep/home");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>
<template>
  <el-form
    ref="formRef"
    label-position="left"
    :model="loginInstance"
    class="form"
    scroll-to-error
  >
    <el-form-item
      label="账号"
      prop="username"
      required
      :rules="[{ required: true, type: 'string', message: '请填写账号' }]"
    >
      <el-input v-model.number="loginInstance.username" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      required
      :rules="[{ required: true, type: 'string', message: '请填写密码' }]"
    >
      <el-input v-model="loginInstance.password" placeholder="请输入密码" />
    </el-form-item>
    <el-form-item>
      <el-button class="loginButton" type="primary" @click="onLogin(formRef)"
        >登录</el-button
      >
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
