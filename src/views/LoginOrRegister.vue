<script setup lang="ts">
import router from "@/router";
import { reactive, ref } from "vue";

const isLogin = ref<number>(0);
const contextPathMap = reactive({
  0: { path: "/login", content: "登录" },
  1: { path: "/registe", content: "注册" },
});
// 修改显示组件
const changeStatus = () => {
  isLogin.value = isLogin.value === 0 ? 1 : 0;
  router.push(contextPathMap[isLogin.value as keyof typeof contextPathMap].path);
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
                  contextPathMap[isLogin as keyof typeof contextPathMap].content
                }}</el-button></el-col
              >
            </el-row>
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </router-view>
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
