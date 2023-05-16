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
  <el-card class="box-card">
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
    <CreatePositio :dialog="dialogInfo.dialog" :handelclose="handelDialog" />
  </el-card>
</template>
<style scoped lang="scss">
.box-card {
  width: 80vw;
  translate: 10vw 4rem;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
