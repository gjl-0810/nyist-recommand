<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import RecruitProfileList from "./RecruitProfileList.vue";
import RecruitSkeleton from "./RecruitSkeleton.vue";
import { reactive, ref, toRaw, watch } from "vue";
import Search from "./Search.vue";
import type { recommondInfo } from "@/http/reception/receptionType";
import { fuzzy } from "@/http/reception/reception";
import { IS_LIST, getValue } from "@/cath";
import { CodeToText } from "./instance";
const recommondInfoList = reactive({
  recommandList: [] as recommondInfo[],
  total: 0,
});
const isLoading = ref(false);
/**查询条件 */
//是否上市
const isList = ref(Number(getValue(IS_LIST)) || 1);
const handelIsList = (value: number) => {
  isList.value = value;
};
//搜索输入框
const searchInput = ref("");
const handelInput = (value: string) => {
  searchInput.value = value;
};
//公司地点
const position = ref("");
const handelPosition = (value: any) => {
  let temp = "";
  for (const item of toRaw(value)) {
    temp += CodeToText[item] + "/";
  }
  position.value = temp.slice(0, -1);
};
// 默认请求职位查询
const getResumeLlist = () => {
  fuzzy(
    {
      position: position.value,
      isList: isList.value,
      companyName: searchInput.value,
      pageSize: 11,
      pageNumber: 0,
    },
    (res) => {
      const { recommondInfo, total } = res.data;
      recommondInfoList.recommandList.push(...recommondInfo);
      recommondInfoList.total = total;
      isLoading.value = !isLoading.value;
    }
  );
};

getResumeLlist();
watch([isList, searchInput, position], () => {
  // isLoading.value = !isLoading.value;
  getResumeLlist();
});
</script>
<template>
  <div>
    <Search
      :is-list="isList"
      :handel-is-list="handelIsList"
      :search-input="searchInput"
      :handel-input="handelInput"
      :position="position"
      :handel-position="handelPosition"
    />
    <RecruitProfileList
      :recommand-list="recommondInfoList.recommandList"
      :total="recommondInfoList.total"
    />
  </div>
</template>
<style lang="scss"></style>
