<script setup lang="ts">
import { ref, reactive } from "vue";
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type UploadFile, type UploadFiles, type UploadInstance, type UploadProgressEvent, type UploadRawFile } from "element-plus";

import type { UploadProps, UploadUserFile } from "element-plus";
import { fileUpload } from "@/http/util/util";
import { LOGIN_STATUS_MAP, type MessageStatus } from "@/utils/instance";
import type { AxiosProgressEvent } from "axios";
import { computed } from "@vue/reactivity";
interface upLoadDialogType {
  title: string;
  cancel: string;
  confirm: string;
  limit: number;
  action: string;
  fileList: UploadUserFile[];
  file:FormData
}
interface progressType {
  percentage: number;
  type: string;
}
const upload = ref<UploadInstance>();
const uploadInfo = reactive<upLoadDialogType>({
  title: "简历上传",
  cancel: "取消",
  confirm: "上传",
  limit: 1,
  action: "#",
  fileList: [],
  file:new FormData,
});
const { title, cancel, confirm, limit, action, fileList } = uploadInfo
const progressInfo = reactive<progressType>({
  percentage: 0,
  type: "success",
});
const {type}  = progressInfo
const regFileType = new RegExp("application/pdf$", "i");
const dialogVisible = ref(false);
const isPercentage = computed(() => progressInfo.percentage)
// 文件类型，大小判断
const handleChange: UploadProps["onChange"] = (uploadFile) => {
  if (!regFileType.test(uploadFile.raw?.type as string)) {
    ElMessage.error("文件格式必须为pdf");
    return false;
  } else if ((uploadFile.size as number) / 1024 / 1024 > 5) {
    ElMessage.error("文件最大不超过5M");
    return false;
  }
  fileList&&fileList.pop()
  // 展示缩略图
  fileList.push({ name: uploadFile.name});
  return true;
};
const handleCancel = (e: Event) => {
  dialogVisible.value = false;
};
const handleConfirm = (params: { file: File; }) => {
    uploadInfo.file.set('file',params.file,encodeURIComponent(params.file.name));
    fileUpload(uploadInfo.file,handelProgess,(res: { data: { message: string; code: number; }; })=>{
    uploadInfo.file.set('file','');
      const {message,code} = res.data
      console.log(res.data);
      ElMessage({
        grouping: true,
        message: message,
        type: LOGIN_STATUS_MAP[code] as MessageStatus,
      })
    })
};
const handleSubmit=()=>{
  if(fileList.length)
  upload.value!.submit()
  else
  ElMessage({
        grouping: true,
        message: '请先选择简历',
        type: 'warning',})
}
const handelRemove = () => {
  fileList.pop();
  if(isPercentage)
   progressInfo.percentage = 0;
}
const handelDialog = () => {
  dialogVisible.value = true;
};
const handelProgess = (progressEvent: AxiosProgressEvent) :void =>{
  if(progressEvent.total){
    progressInfo.percentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total  );
  }
}
/**
 * 阻止事件传递
 * @param e
 */
const handelStopPropagation = (e: Event) => {
  // 事件代理的作用，阻止事件继续传播，导致操作dialog时手风琴打开/关闭
  e.stopPropagation();
};
</script>
<template>
  <div @click="handelStopPropagation">
    <el-button type="primary" @click="handelDialog"> 一键投递 </el-button>
    <el-dialog v-model="dialogVisible" :title="title" width="30rem">
      <div class="upload-dialog">
        <el-upload
          ref="upload"
          class="resume-uploader"
          v-model:file-list="fileList"
          :action="action"
          :on-change="handleChange"
          :on-remove="handelRemove"
          :limit="limit"
          :auto-upload="false"
          :http-request="handleConfirm"
        >
          <el-icon v-if="!fileList.length" class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
        <el-progress
          type="dashboard"
          :percentage="progressInfo.percentage"
          :status="type"
        >
          <template #default="{ percentage }">
            <span class="percentage-value">{{ percentage }}%</span>
            <span class="percentage-label">当前进度</span>
          </template>
        </el-progress>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="handleCancel">{{ cancel }}</el-button>
          <el-button type="primary" @click="handleSubmit"> {{ confirm }} </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
.upload-dialog {
  display: flex;
  align-items: center;
  justify-content: space-around;
  .resume-uploader {
    display: flex;
    border: 0.00625rem dashed var(--el-border-color);
    border-radius: 0.375rem;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  .resume-uploader:hover {
    border-color: var(--el-color-primary);
  }
}
.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 7.875rem;
  height: 7.875rem;
  text-align: center;
}
.percentage-value {
  display: block;
  margin-top: 0.625rem;
  font-size: 1.75rem;
}
.percentage-label {
  display: block;
  margin-top: 0.625rem;
  font-size: 0.75rem;
}
</style>
