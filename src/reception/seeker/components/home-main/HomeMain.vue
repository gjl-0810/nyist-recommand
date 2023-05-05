<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Carousel from "./Carousel.vue";
import RecruitProfileList from "./RecruitProfileList.vue";
import RecruitSkeleton from "./RecruitSkeleton.vue";
import { reactive, ref, watch } from "vue";
import Search from "./Search.vue";
import type { recommondInfo } from "@/http/reception/receptionType";
import { fuzzy } from "@/http/reception/reception";
import { computed } from "@vue/reactivity";
import { useSearchStore } from "@/stores/seeker/search";
import { IS_LIST, getValue } from "@/cath";
const searchStore = useSearchStore();
const recommondInfoList = reactive({
  recommandList: [] as recommondInfo[],
  total: 0,
});
let count = 0;
fuzzy(
  {
    position: "",
    isList: Number(getValue(IS_LIST)) || 1,
    companyName: "",
    pageSize: 11,
    pageNumber: 0,
  },
  (res) => {
    const { recommondInfo, total } = res.data;
    recommondInfoList.recommandList.push(...recommondInfo);
    recommondInfoList.total = total;
    count = count + 1;
  }
);
watch(
  [searchStore.position, searchStore.isList, searchStore.searchInput],
  () => {
    fuzzy(
      {
        position: searchStore.position,
        isList: searchStore.isList,
        companyName: searchStore.searchInput,
        pageSize: 11,
        pageNumber: 0,
      },
      (res) => {
        const { recommondInfo, total } = res.data;
        recommondInfoList.recommandList.push(...recommondInfo);
        recommondInfoList.total = total;
        count = count + 1;
      }
    );
  },
  { flush: "post" }
);
const isLoading = computed(() => !Boolean(recommondInfoList.recommandList.length));
</script>
<template>
  <div>
    <Carousel />
    <Search />
    <RecruitSkeleton :is-loading="isLoading">
      <RecruitProfileList
        :recommand-list="recommondInfoList.recommandList"
        :total="recommondInfoList.total"
      />
    </RecruitSkeleton>
  </div>
</template>
<style lang="scss"></style>
