<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Carousel from "./Carousel.vue";
import RecruitProfileList from "./RecruitProfileList.vue";
import RecruitSkeleton from "./RecruitSkeleton.vue";
import { onMounted, reactive, ref, watch, watchEffect } from "vue";
import Search from "./Search.vue";
import type { recommondInfo } from "@/http/reception/receptionType";
import { fuzzy } from "@/http/reception/reception";
import { computed } from "@vue/reactivity";
const Recruit = ref(RecruitProfileList);
const recommondInfoList = reactive({
  recommandList: [] as recommondInfo[],
  total: 0,
});

watchEffect(() => {
  if (Recruit.value.pageNumber >= 0) {
    fuzzy({ pageSize: 20, pageNumber: Recruit.value.pageNumber }, (res) => {
      const { recommondInfo, total } = res.data;
      recommondInfoList.recommandList = recommondInfo;
      recommondInfoList.total = total;
    });
  }
});
onMounted(() => {
  // fuzzy({ pageSize: 10, pageNumber: Recruit.value.pageNumber }, (res) => {
  //   const { recommondInfo, total } = res.data;
  //   recommondInfoList.recommandList = recommondInfo;
  //   recommondInfoList.total = total;
  // });
});
const isLoading = computed(() => !Boolean(recommondInfoList.recommandList));
</script>
<template>
  <Carousel />
  <Search />
  <RecruitSkeleton :is-loading="isLoading">
    <RecruitProfileList
      ref="Recruit"
      :recommand-list="recommondInfoList.recommandList"
      :total="recommondInfoList.total"
    />
  </RecruitSkeleton>
</template>
<style lang="scss"></style>
