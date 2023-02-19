<script setup lang="ts">
import { ref } from "vue";
import { RouterView } from "vue-router";
import zhCn from "element-plus/lib/locale/lang/zh-cn";
const locale = ref(zhCn);
</script>

<template>
  <!-- 默认为中文 -->
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
