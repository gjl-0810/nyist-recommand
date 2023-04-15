<script setup lang="ts">
import { reactive } from "vue";
import ResumeTable from "./Resume-table.vue";
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
  <el-card class="box-card" title="简历处理">
    <!-- 已创建职位 -->
    <ResumeTable />
  </el-card>
</template>
<style scoped lang="scss">
.box-card {
  width: 80vw;
  translate: 10vw 4rem;
}
</style>
