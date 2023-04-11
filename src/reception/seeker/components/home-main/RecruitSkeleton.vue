<script setup lang="ts">
import { useSlots } from "@vue/runtime-core";
const slot = useSlots();
const { isLoading } = defineProps<{
  isLoading: boolean;
}>();
</script>
<template>
  <el-skeleton class="scroll-warp" :loading="isLoading" animated :rows="1" :throttle="1">
    <template #template>
      <div v-for="item in 10">
        <el-skeleton-item :key="item" class="description" variant="h3" />
      </div>
    </template>
    <template #default>
      <slot></slot>
    </template>
  </el-skeleton>
</template>
<style scoped lang="scss">
.scroll-warp {
  width: 80vw;
  margin: 0.5rem auto;
  height: 30rem;
  max-height: 30rem;
  .description {
    height: 3rem;
  }
}
</style>
