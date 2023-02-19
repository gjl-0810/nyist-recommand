<script setup lang="ts">
import { reactive } from "vue";
type errorPageTYpe = {
  title: string;
  iconSrc?: string;
  subTitle?: string;
};
const { title, iconSrc, subTitle } = reactive<errorPageTYpe>({
  title: "404",
  iconSrc: "error",
  subTitle: "当前访问页面不存在",
});
</script>
<template>
  <el-result class="errorPage" :title="title" :sub-title="subTitle" :icon="iconSrc">
  </el-result>
</template>
<style lang="scss">
.errorPage {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
