<script setup lang="ts">
import LoginPageVue from "./LoginPage.vue";
import RegisterPageVue from "./RegisterPage.vue";
import { ref } from "vue";

const isLogin = ref<boolean>(true);
const content = ref<string>("注册");
// 修改显示组件
const changeStatus = () => {
  isLogin.value = !isLogin.value;
  content.value = content.value === "注册" ? "登录" : "注册";
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
              <el-col :span="12" class="tip-center"
                ><el-button type="success" link @click="changeStatus">{{
                  content
                }}</el-button></el-col
              >
            </el-row>
            <keep-alive>
              <component :is="isLogin ? LoginPageVue : RegisterPageVue"></component>
            </keep-alive>
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
