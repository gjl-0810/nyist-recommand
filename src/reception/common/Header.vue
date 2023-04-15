<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { USER_NICk_NAME, clearValue, getValue } from "@/cath";
import router from "@/router";
import { ElMessage } from "element-plus";
import { reactive, toRefs } from "vue";
import { useAccountInfoStore } from "@/stores/accountInfo";
const accountInfoStore = useAccountInfoStore();
type headerDateType = {
  iconSrc: string;
  content: string;
};
const headerDate = reactive<headerDateType>({
  iconSrc: "",
  content: "南阳理工微软工作室内推系统",
});
const { iconSrc, content } = toRefs(headerDate);
const handleCommand = (command: string | number | object) => {
  clearValue();
  router.push("/login");
  ElMessage({ type: "success", message: "已退出登录！" });
};
</script>
<template>
  <header class="header">
    <img :src="iconSrc" alt="图标" />
    <span>{{ content }}</span>
    <el-dropdown @command="handleCommand" class="dropMenu">
      <el-avatar class="avater">{{ accountInfoStore.nickName }}</el-avatar>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="legout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </header>
</template>
<style lang="scss">
.header {
  width: 100vw;
  display: flex;
  justify-content: space-around;
}
.dropMenu {
  cursor: pointer;
  .avater {
    background-color: #409eff;
  }
}
</style>
