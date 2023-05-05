<script setup lang="ts">
import type { LoginType } from "@/http/reception/receptionType";
import router from "@/router";
import { ADMIN_PASSWORD, ADMIN_USER_NAME, ADMIN_USER_NICK_NAME,  TOKEN, setValue } from "@/cath";
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
        router.push('/manage/statistic');
      });
    } else {
      return false;
    }
  });
};
</script>
<template>
  <main>
    <el-card>
      <el-row class="cardPage">
        <el-col :span="12"><img src="@/assets/logo.svg" alt="logo" /></el-col>
        <el-col :span="12">
          <div>
            <el-row>
              <el-col :span="12" class="tip-center"><span>NYST-WR</span></el-col>
            </el-row>
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
            </el-form>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </main>
</template>

<style lang="scss" scoped>
.cardPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  img {
    width: 20rem;
    height: 20rem;
  }
  .login-register-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
.tip-center {
  display: flex;
  justify-content: center;
  span {
    font-size: 1.2rem;
  }
  button {
    font-size: 1.5rem;
  }
}
// @media (max){

// }
</style>
