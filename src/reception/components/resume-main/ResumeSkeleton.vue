<script setup lang="ts">
import { useSlots } from "@vue/runtime-core";
const slot = useSlots();
const { isLoading } = defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <el-skeleton :loading="isLoading" animated rows="1" throttle="100">
    <template #template>
      <el-skeleton-item class="pdf_view" variant="image" />
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>
<style scoped lang="scss">
.pdf_view {
  height: 60rem;
  min-height: 30rem;
  width: 80vw;
  margin: 0 auto;
}
</style>
