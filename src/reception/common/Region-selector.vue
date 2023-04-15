<script setup lang="ts">
import { regionData } from "@/reception/seeker/components/home-main/instance";
import { useSearchStore } from "@/stores/seeker/search";
const searchStore = useSearchStore();
</script>
<template>
  <el-cascader
    placeholder="请输入/选择地址"
    filterable
    clearable
    :options="regionData"
    @change="searchStore.handelPosition"
  />
</template>
<style scoped lang="scss"></style>
