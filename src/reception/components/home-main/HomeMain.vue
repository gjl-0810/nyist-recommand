<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import Carousel from "./Carousel.vue";
import RecruitProfileList from "./RecruitProfileList.vue";
import { ref } from "vue";
import Search from "./Search.vue";
const count = ref(0);
const load = () => {
  count.value += 2;
};
</script>
<template>
  <Carousel />
  <Search />
  <!-- <keep-alive> -->
  <!-- 异步组件 suspense-->
  <Suspense>
    <RecruitProfileList />
    <template #fallback> Loading.... </template>
  </Suspense>
  <!-- </keep-alive> -->
</template>
<style lang="scss"></style>
