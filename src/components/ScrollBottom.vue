<script setup lang="ts">
import { ElementPlus } from "@element-plus/icons-vue";

const props = withDefaults(
  defineProps<{
    message?: string;
    status: boolean;
  }>(),
  {
    message: "我也是有底线的！哼",
  }
);
</script>
<template>
  <div class="scroll-bottom" v-if="props.status">
    <el-text>
      <el-icon>
        <ElementPlus />
      </el-icon>
      {{ props.message }}
    </el-text>
  </div>
</template>
<style scoped lang="scss">
.scroll-bottom {
  text-align: center;
  margin: 1rem auto;
}
</style>
