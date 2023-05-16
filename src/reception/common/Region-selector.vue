<script setup lang="ts">
import { regionData } from "@/reception/seeker/components/home-main/instance";
import { ref, watch } from "vue";
const positonInfo = defineProps<{
  handelPosition: (value: any) => void;
}>();
const test = ref("");
watch(test, () => {
  console.log(test);
});
</script>
<template>
  <el-cascader
    placeholder="请输入/选择地址"
    filterable
    clearable
    v-model="test"
    :options="regionData"
    @change="positonInfo.handelPosition"
  />
</template>
<style scoped lang="scss"></style>
