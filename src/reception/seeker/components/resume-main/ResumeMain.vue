<script setup lang="ts">
import resolvePdfVue from "@/components/ResolvePdf.vue";
import { downloadPdf } from "@/http/reception/reception";
import { LOGIN_STATUS_MAP, type MessageStatus } from "@/utils/instance";
import { ElMessage } from "element-plus";
import { reactive } from "vue";
import ResumeSkeleton from "./ResumeSkeleton.vue";
const pdfFileInfo = reactive({
  currentPage: 1,
  base64String: "",
  message: "",
});
const pageChanga =  (size: number) => {
  // 请求pdf文件
  downloadPdf({ fileId: size }, (res) => {
    const { base64Date, message, code } = res.data;
    pdfFileInfo.base64String = base64Date||' ';
    ElMessage({
      grouping: true,
      message: message,
      type: LOGIN_STATUS_MAP[code] as MessageStatus,
    });
  });
  pdfFileInfo.currentPage = size;
};
  pageChanga(1);
</script>
<template>
  <ResumeSkeleton :is-loading="!Boolean(pdfFileInfo.base64String)">
    <div class="resume-wrap" v-if="pdfFileInfo.base64String">
      <resolvePdfVue
        class="resolve-pdf"
        :current-page="pdfFileInfo.currentPage"
        :base64-string="pdfFileInfo.base64String"
      />
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="1"
        :total="5"
        @current-change="pageChanga"
        class="pdf-page"
      />
    </div>
  </ResumeSkeleton>
</template>
<style scoped lang="scss">
.resume-wrap {
  height: 60rem;
  min-height: 30rem;
  display: flex;
  flex-direction: column;
}
.resolve-pdf {
  margin: 0 auto;
  width: 80vw;
  flex: 1;
  display: inline-flex;
  &.pdf-viewer {
    min-width: 80vw;
  }
}
.pdf-page {
  margin: 1rem auto;
}
</style>
