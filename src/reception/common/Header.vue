<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { reactive, toRefs } from "vue";
type headerDateType = {
  iconSrc: string;
  content: string;
  typeColor: string;
};
const headerDate = reactive<headerDateType>({
  iconSrc: "",
  content: "南阳理工微软工作室内推系统",
  typeColor: "a",
});
const { iconSrc, content, typeColor } = toRefs(headerDate);
</script>
<template>
  <header class="header">
    <img :src="iconSrc" alt="图标" />
    <span>{{ content }}</span>
    <el-switch
      v-model="typeColor"
      class="ml-2"
      inline-prompt
      style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
      active-text="暗色调"
      inactive-text="亮色调"
    />
  </header>
</template>
<style lang="scss">
.header {
  width: 100vw;
  display: flex;
  justify-content: space-around;
}
</style>
