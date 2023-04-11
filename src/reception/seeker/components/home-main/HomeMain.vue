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
let count = 0;
watchEffect(
  () => {
    if (Recruit.value && Recruit.value.pageNumber >= 0) {
      if (count === 0 || Recruit.value.pageNumber >= 1)
        fuzzy({ pageSize: 11, pageNumber: Recruit.value.pageNumber }, (res) => {
          const { recommondInfo, total } = res.data;
          recommondInfoList.recommandList.push(...recommondInfo);
          recommondInfoList.total = total;
          count = count + 1;
        });
    }
  },
  { flush: "post" }
);
const isLoading = computed(() => !Boolean(recommondInfoList.recommandList.length));
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
