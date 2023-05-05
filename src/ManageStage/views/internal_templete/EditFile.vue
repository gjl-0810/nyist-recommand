<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { ElMessage, type UploadInstance, type UploadProps, type UploadUserFile } from "element-plus";
import type { AxiosProgressEvent } from "axios";
const props = defineProps<{
  //回调函数 将网络请求放在外部
  handelCb: <T extends FormData>(key: T,progress:(cb:AxiosProgressEvent)=>void) => void;
  //功能分类
  keyValue: string;
  handelDialog:()=>void
}>();
interface upLoadDialogType {
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
  cancel: "取消",
  confirm: "上传",
  limit: 1,
  action: "#",
  fileList: [],
  file:new FormData,
});
const {cancel, confirm, limit, action, fileList } = uploadInfo
const progressInfo = reactive<progressType>({
  percentage: 0,
  type: "success",
});
const {type}  = progressInfo
const regFileType = new RegExp("application/pdf$", "i");
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
const handelProgess = (progressEvent: AxiosProgressEvent) :void =>{
  if(progressEvent.total){
    progressInfo.percentage = Math.round( (progressEvent.loaded * 100) / progressEvent.total  );
  }
}
const handleConfirm = (params: { file: File; }) => {
    uploadInfo.file.set('resume',params.file,encodeURIComponent(params.file.name));
    uploadInfo.file.set('pdfFileName',params.file.name);
    switch (props.keyValue) {
          case "insert": {
            props.handelCb(uploadInfo.file,handelProgess);
            break;
          }
          case "update": {
            props.handelCb(uploadInfo.file,handelProgess);
            break;
          }
        }
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
</script>
<template>
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
    <el-progress type="dashboard" :percentage="progressInfo.percentage" :status="type">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">当前进度</span>
      </template>
    </el-progress>
  </div>
  <div class="dialog-footer">
    <el-button @click="props.handelDialog">{{ cancel }}</el-button>
    <el-button type="primary" @click="handleSubmit"> {{ confirm }} </el-button>
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
.dialog-footer {
  display: flex;
  margin-top: 1.5rem;
  justify-content: flex-end;
}
</style>
