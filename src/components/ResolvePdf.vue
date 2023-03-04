<script setup lang="ts">
import { BASE_URL, request } from "@/http";
import { downloadPdf } from "@/http/reception";
import { reactive } from "@vue/reactivity";
import PDFViewer from "pdf-viewer-vue";

interface downloadType {
  src: string;
  filename: string;
}
const { curPagePdf } = defineProps({
  curPagePdf: Number,
});
const handleDownload = function ({ src, filename }: downloadType) {
  downloadPdf({ src }, (res) => {
    let blob = new Blob([res.data], { type: "application/pdf;charset=utf-8" });
    let url = window.URL.createObjectURL(blob);
    let a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  });
};
</script>
<template>
  <div>
    <PDFViewer
      :source="`${BASE_URL}/pdfFIle?pdfPath=${curPagePdf}`"
      @download="(data:downloadType)=>handleDownload(data)"
    />
  </div>
</template>
<style scoped lang="scss"></style>
