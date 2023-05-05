<script setup lang="ts">
import PositionList from "./Position-list.vue";
import CreatePosition from "./Create-position.vue";
import { reactive } from "vue";
/**
 * dialog
 */
const dialogInfo = reactive({
  dialog: false,
});
const handelDialog = () => {
  dialogInfo.dialog = !dialogInfo.dialog;
};
</script>
<template>
  <el-card>
    <template #header>
      <div class="card-header">
        <span>创建职位</span>
        <el-button class="button" text type="success" @click="handelDialog"
          >点击创建</el-button
        >
      </div>
    </template>
    <!-- 已创建职位 -->
    <PositionList />
    <CreatePosition :dialog="dialogInfo.dialog" :handelclose="handelDialog" />
  </el-card>
</template>
<style scoped lang="scss">
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
