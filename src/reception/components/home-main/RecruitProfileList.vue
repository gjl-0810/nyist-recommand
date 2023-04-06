<script setup lang="ts">
import {
  Avatar,
  Position,
  User,
  Grid,
  Comment,
  Connection,
  Share,
} from "@element-plus/icons-vue";
import UpLoad from "@/components/UpLoad.vue";
import type { recommondInfo } from "@/http/reception/receptionType";
import { ref } from "vue";
import { computed } from "@vue/reactivity";
const { recommandList, total } = defineProps<{
  recommandList: recommondInfo[];
  total: number;
}>();
const isListMap = {
  1: { type: "success", label: "已上市" },
  2: { type: "danger", label: "未上市" },
};
const pageNumber = ref(0);
const isScrollDisabled = computed(() => recommandList.length === total);
const handelPageNUmber = () => {
  pageNumber.value++;
  console.log("asdf");
};
defineExpose({
  pageNumber,
});
</script>

<template>
  <el-collapse class="scroll-warp" accordion>
    <el-collapse-item v-for="item in recommandList" :key="item.key" :name="item.key">
      <template #title>
        <div class="description">
          <div class="description-item">
            <el-icon class="iconStyle"><Avatar /></el-icon>
            <label>公司名称：</label>
            {{ item.companyName }}
            <el-tag
              :type="isListMap[item.isList as keyof typeof isListMap].type||'error'"
              class="isList-tag"
              effect="light"
              round
            >
              {{ isListMap[item.isList as keyof typeof isListMap].label }}
            </el-tag>
          </div>
          <div class="description-item">
            <el-icon class="iconStyle"><Share /></el-icon>
            <label>推荐岗位：</label>
            {{ item.internalPromotionPost }}
          </div>
          <div class="description-item">
            <el-icon class="iconStyle"><User /></el-icon> 招聘人数：{{ item.count }}
          </div>
          <UpLoad />
        </div>
      </template>
      <div class="description-content">
        <el-icon class="iconStyle"><Grid /></el-icon>
        <label>公司简介：</label>
        {{ item.companyProfile }}
      </div>
      <div class="description-content">
        <el-icon class="iconStyle"><Comment /></el-icon>
        <label>招聘简介：</label>
        {{ item.recommandInfo }}
      </div>
      <div class="description-content">
        <el-icon class="iconStyle"><Position /></el-icon>
        <label>工作地点：</label>
        {{ item.position }}
      </div>
      <div class="description-content" v-if="item.contactInfo">
        <el-icon class="iconStyle"><Connection /></el-icon>
        <label>联系方式：</label>
        {{ item.contactInfo }}
      </div>
    </el-collapse-item>
  </el-collapse>
</template>
<style lang="scss" scoped>
.scroll-warp {
  width: 80vw;
  margin: 0 auto;
  height: 30rem;
  overflow: auto;
}
.description {
  display: flex;
  overflow: hidden;
  width: 95rem;
  min-width: 37.25rem;
  .description-item {
    min-width: 10.3125rem;
    margin: 0 0.4rem;
    overflow: hidden;
    display: inline-block;
  }
  div:nth-child(3) {
    flex: 1;
  }
}
.description-content {
  margin: 0 0.4rem;
}
.iconStyle {
  margin: 0 0.5rem 0 0;
  vertical-align: middle;
}
</style>
