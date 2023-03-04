<script setup lang="ts">
import resolvePdfVue from "@/components/ResolvePdf.vue";
import { ref } from "vue";
const curPagePdf = ref<number>(1);
const pageChanga = (size: number) => {
  curPagePdf.value = size;
};
</script>
<template>
  <div class="resume-wrap">
    <resolvePdfVue class="resolve-pdf" :curPagePdf="curPagePdf" />
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="1"
      :total="5"
      @current-change="pageChanga"
      class="pdf-page"
    />
  </div>
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
