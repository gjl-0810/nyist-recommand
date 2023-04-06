<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { clearValue } from "@/cath";
import router from "@/router";
import { ElMessage } from "element-plus";
import { reactive, toRefs } from "vue";
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
  router.push("/login");
};
</script>
<template>
  <header class="header">
    <img :src="iconSrc" alt="图标" />
    <span>{{ content }}</span>
    <el-dropdown @command="handleCommand" class="dropMenu">
      <el-avatar
        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
      />
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
}
</style>
