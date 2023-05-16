<script setup lang="ts">
import type { LoginType } from "@/http/reception/receptionType";
import router from "@/router";
import UpdatePwdPage from "./UpdatePwd.vue";
import { ADMIN_NAV_KEY, ADMIN_PASSWORD, ADMIN_USER_NAME, ADMIN_USER_NICK_NAME,  TOKEN, getValue, setValue } from "@/cath";
import { reactive, ref } from "vue";
import { ElMessage, type FormInstance } from "element-plus";
import { adminLogin } from "@/http/back/account/account";

const loginInstance = reactive<LoginType>({
  username: "",
  password: "",
});
const formRef = ref<FormInstance>();
const onLogin = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
        adminLogin(loginInstance, (res) => {
        const {userNickName,message} = res.data;
        setValue(ADMIN_USER_NAME,loginInstance.username);
        setValue(ADMIN_USER_NICK_NAME,userNickName);
        setValue(ADMIN_PASSWORD,loginInstance.password);
        ElMessage({
          grouping: true,
          type: 'success',
          message,
        })
        router.push(getValue(ADMIN_NAV_KEY) || "/manage/statistic")
      });
    } else {
      return false;
    }
  });
};
const isDialog = ref(false);
const handelDialog =() => {
          isDialog.value = !isDialog.value;
  }
</script>
<template>
  <main>
    <el-card>
      <div class="cardPage">
        <img src="@/assets/logo.svg" alt="logo" />
        <div>
          <h1 class="header">NYIST-WR</h1>
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
              <el-input
                v-model.number="loginInstance.username"
                placeholder="请输入账号"
              />
            </el-form-item>
            <el-form-item
              label="密码"
              prop="password"
              required
              :rules="[{ required: true, type: 'string', message: '请填写密码' }]"
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
            <el-form-item>
              <el-link type="success" @click="handelDialog">忘记密码？</el-link>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-card>
    <UpdatePwdPage
      v-if="isDialog"
      :is-dialog="isDialog"
      :handel-dialog-close="handelDialog"
    />
  </main>
</template>

<style lang="scss" scoped>
.cardPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  img {
    width: 20rem;
    height: 20rem;
  }
}
.header {
  text-align: center;
}

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
