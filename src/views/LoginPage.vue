<script setup lang="ts">
import { NAV_KEY, TOKEN, USERNAME, USER_NICk_NAME, getValue, setValue } from "@/cath";
import { login } from "@/http/reception/account";
import LoginDialog from './LoginDialog.vue'
import type { LoginType } from "@/http/reception/receptionType";
import router from "@/router";
import { LOGIN_STATUS_MAP, type MessageStatus } from "@/utils/instance";
import { ElMessage, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";


const loginInstance = reactive<LoginType>({
  username: "",
  password: "",
});
const formRef = ref<FormInstance>();
const dialogInfo = {
  tipMessage:'已检测到多个身份，请选择登录页面',
  recommonder:'内推者',
  seekers:'求职者'
}
const dialogStatus = ref(false);
const {tipMessage,recommonder,seekers} = dialogInfo
const onLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(loginInstance, (res) => {
        const {token,username,userNickName} = res.data;
        dialogStatus.value = !dialogStatus.value;
        token&&setValue(TOKEN,token);
        setValue(USERNAME,username)
        setValue(USER_NICk_NAME,userNickName)
      });
    } else {
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
      :rules="[{ required: true, type: 'number', message: '请填写账号' }]"
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
  <LoginDialog
    :is-dialog="dialogStatus"
    :skip-seekers="seekers"
    :skip-recommonder="recommonder"
    :Tipmessage="tipMessage"
    :success-cb="
      () =>
        ElMessage({
          grouping: true,
          type: 'success',
          message: '登录成功',
        })
    "
  />
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
