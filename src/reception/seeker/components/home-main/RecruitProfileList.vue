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
import { ref, watch } from "vue";
import ScrollBottom from "@/components/ScrollBottom.vue";
const recommondInfo = defineProps<{
  recommandList: recommondInfo[];
  total: number;
}>();
const isScroll = ref(false);
const isListMap = {
  1: { type: "success", label: "已上市" },
  2: { type: "danger", label: "未上市" },
};
const pageNumber = ref(0);
const svg = `<path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>`;
// 滚动加载
const handelPageNumber = () => {
  // 请求时，不允许进行滚动加载
  // if (recommondInfo.recommandList.length !== recommondInfo.total) {
  //   isScroll.value = !isScroll.value;
  //   pageNumber.value++;
  // }
};

defineExpose({
  pageNumber,
});
</script>

<template>
  <el-scrollbar class="scroll-warp">
    <el-collapse
      accordion
      v-infinite-scroll="handelPageNumber"
      :infinite-scroll-disabled="isScroll"
      infinite-scroll-immediate="false"
      element-loading-text="加载中..."
      :element-loading-spinner="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
      element-loading-background="rgba(122, 122, 122, 0.8)"
    >
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
              {{ item.recommondPosition }}
            </div>
            <div class="description-item">
              <el-icon class="iconStyle"><User /></el-icon> 招聘人数：{{ item.count }}
            </div>
            <UpLoad
              :username="item.username"
              :recommond-position="item.recommondPosition"
              :company-name="item.companyName"
              :email="item.email"
              :date="item.endDate"
            />
          </div>
        </template>
        <div class="description-content">
          <el-icon class="iconStyle"><Grid /></el-icon>
          <label>薪资范围</label>
          {{ item.salary }}
        </div>
        <div class="description-content">
          <el-icon class="iconStyle"><Comment /></el-icon>
          <label>岗位简介：</label>
          {{ item.jobDescription }}
        </div>
        <div class="description-content">
          <el-icon class="iconStyle"><Position /></el-icon>
          <label>工作地点：</label>
          {{ item.position }}
        </div>
        <div class="description-content">
          <el-icon class="iconStyle"><Connection /></el-icon>
          <label>截止日期</label>
          {{ item.endDate }}
        </div>
        <div class="description-content" v-if="item.recommondPosition">
          <el-icon class="iconStyle"><Connection /></el-icon>
          <label>推荐者岗位</label>
          {{ item.recommondPosition }}
        </div>
        <div class="description-content">
          <el-icon class="iconStyle"><Connection /></el-icon>
          <label>公司邮箱</label>
          {{ item.email }}
        </div>
      </el-collapse-item>
      <scroll-bottom :status="Boolean(recommandList.length === total)"></scroll-bottom>
    </el-collapse>
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.scroll-warp {
  width: 80vw;
  margin: 0 auto;
  height: 50rem;
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
