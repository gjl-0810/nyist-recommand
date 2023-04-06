<script setup lang="ts">
import { ElMessage } from "element-plus";
import PDFViewer from "pdf-viewer-vue";

interface downloadType {
  base64String: string;
  filename: string;
}
const { currentPage, base64String } = defineProps<{
  currentPage: number;
  base64String: string;
}>();
const handleDownload = function ({ base64String, filename }: downloadType) {
  const bytes = atob(base64String);
  const arrayBuffer = new ArrayBuffer(bytes.length);
  const uint8Array = new Uint8Array(arrayBuffer);
  for (let i = 0; i < bytes.length; i++) {
    uint8Array[i] = bytes.charCodeAt(i);
  }
  // 创建Blob对象
  const blob = new Blob([arrayBuffer], { type: "application/pdf" });
  // 生成文件下载链接
  const url = URL.createObjectURL(blob);
  // 创建一个a标签，模拟用户点击下载
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  // 清除URL对象
  URL.revokeObjectURL(url);
};
const loadError = (message: string) => {
  ElMessage.error({
    grouping: true,
    message,
  });
};
</script>
<template>
  <div>
    <PDFViewer
      :source="`data:application/pdf;base64,${base64String}`"
      @download="
        handleDownload({ base64String: base64String, filename: `${currentPage}.pdf` })
      "
      loadingText="正在加载中，请稍后"
      renderingText="渲染中！！！"
      @loading-failed="loadError('加载失败')"
      @rendering-failed="loadError('渲染失败')"
    />
  </div>
</template>
<style scoped lang="scss"></style>
