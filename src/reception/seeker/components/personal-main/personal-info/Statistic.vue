<script setup lang="ts">
import { Male } from "@element-plus/icons-vue";
</script>
<template>
  <div class="statistic" style="width: calc(80vw - 9rem)">
    <el-statistic title="已投递简历数量" :value="268500" />
    <el-statistic :value="138">
      <template #title>
        <div style="display: inline-flex; align-items: center">
          已面试
          <el-icon style="margin-left: 4px" :size="12">
            <Male />
          </el-icon>
        </div>
      </template>
      <template #suffix>/100</template>
    </el-statistic>
    <el-statistic title="offer数量" :value="172000" />
  </div>
</template>
<style scoped lang="scss">
.statistic {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
