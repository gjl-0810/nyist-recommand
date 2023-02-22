<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessageBox } from "element-plus";
import { ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadProps } from "element-plus";
interface upLoadDialogType {
  title: string;
  cancel: string;
  confirm: string;
}
const { title, cancel, confirm } = reactive<upLoadDialogType>({
  title: "简历上传",
  cancel: "取消",
  confirm: "上传",
});
const imageUrl = ref("");

const handleFileSuccess: UploadProps["onSuccess"] = (response, uploadFile) => {
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
};

const beforeAvatarUpload: UploadProps["beforeUpload"] = (rawFile) => {
  if (rawFile.type !== "image/jpeg") {
    ElMessage.error("Avatar picture must be JPG format!");
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error("Avatar picture size can not exceed 2MB!");
    return false;
  }
  return true;
};

const dialogVisible = ref(false);

const handleCancel = () => {
  //
  dialogVisible.value = false;
};
const handleConfirm = () => {
  //
  dialogVisible.value = false;
};
</script>
<template>
  <el-button type="primary" @click="dialogVisible = true"> 一键投递 </el-button>
  <el-dialog v-model="dialogVisible" :title="title" width="30%">
    <el-upload
      class="avatar-uploader"
      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
      :show-file-list="false"
      :on-success="handleFileSuccess"
      :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleCancel">{{ cancel }}</el-button>
        <el-button type="primary" @click="handleConfirm"> {{ confirm }} </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style lang="scss" scoped></style>
