<script setup lang="ts">
import { NAV_KEY, getValue } from "@/cath";
import router from "@/router";
import type { MessageParams } from "element-plus";
import { reactive, watch } from "vue";
const skip = defineProps<{
  isDialog: boolean;
  skipSeekers: string;
  skipRecommonder: string;
  Tipmessage: string;
  successCb: () => void;
}>();
const dialogInfo = reactive({
  dialogVisible: skip.isDialog,
});
watch(skip, () => {
  dialogInfo.dialogVisible = !dialogInfo.dialogVisible;
});
//  默认上次跳转
const handleClose = () => {
  router.push(getValue(NAV_KEY) || "/rep/home");
  skip.successCb();
};
const skipTo = (path: string) => {
  dialogInfo.dialogVisible = false;
  router.push(path);
  skip.successCb();
};
</script>
<template>
  <el-dialog
    v-model="dialogInfo.dialogVisible"
    title="提示"
    width="40rem"
    :before-close="handleClose"
  >
    <span>{{ skip.Tipmessage }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="skipTo('/recommond/home')">求职者</el-button>
        <el-button type="primary" @click="skipTo('/rep/home')"> 内推者 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped lang="scss"></style>
