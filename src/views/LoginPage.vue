<script setup lang="ts">
import { NAV_KEY, USERNAME, USER_NICk_NAME, getValue, setValue } from "@/cath";
import UpdatePwd from './UpdatePwd.vue'
import { login } from "@/http/reception/account";
import type { LoginType } from "@/http/reception/receptionType";
import { ElMessage, type FormInstance } from "element-plus";
import { reactive, ref } from "vue";
import router from "@/router";
const loginInstance = reactive<LoginType>({
  username: "",
  password: "",
});
const formRef = ref<FormInstance>();
const elMessage =()=>ElMessage({
          grouping: true,
          type: 'success',
          message: '登录成功',
        })
const onLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      login(loginInstance, (res) => {
        const {username,userNickName,isRecommand} = res.data;
        setValue(USERNAME,username)
        setValue(USER_NICk_NAME,userNickName)
        router.push(isRecommand?'/recommond/home' :'rep/home')
        elMessage();
      });
    } else {
      return false;
    }
  });
};
/**控制 修改密码dialog */
const isDialog = ref(false);
const handelDialogClose = () => {
  isDialog.value = !isDialog.value;
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
      :rules="[{ required: true, type: 'any', message: '请填写合法账号' }]"
    >
      <el-input v-model.number="loginInstance.username" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item
      label="密码"
      prop="password"
      required
      :rules="[{ required: true, type: 'any', message: '请填写合法密码' }]"
    >
      <el-input
        type="password"
        clearable
        v-model="loginInstance.password"
        placeholder="请输入密码"
      />
    </el-form-item>
    <el-form-item>
      <el-button class="loginButton" type="primary" @click="onLogin(formRef)"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
  <div class="handel-exchange">
    <div>
      <el-link type="success" @click="handelDialogClose">忘记密码？</el-link>
    </div>
    <div>
      <el-link type="danger" @click="router.push('/registe')">还没有账号，去注册</el-link>
    </div>
  </div>
  <UpdatePwd
    v-if="isDialog"
    :is-dialog="isDialog"
    :handel-dialog-close="handelDialogClose"
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
.handel-exchange {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
// @media (max){

// }
</style>
