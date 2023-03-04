<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { recommandListMap } from "./apiTest";
import {
  Avatar,
  Position,
  User,
  Grid,
  Comment,
  Connection,
  Share,
} from "@element-plus/icons-vue";
import { fuzzy } from "@/http/reception";
import UpLoad from "@/components/UpLoad.vue";
import { ElMessage } from "element-plus";
export type listMsgMap = {
  key: string;
  isList: number; //是否上市
  position: string; //工作地点
  count: number; //招聘人数
  companyName: string; //公司名称
  recommandInfo: string; //招聘内容
  internalPromotionPost: string; //内推岗位
  companyProfile: string; //公司简介
  contactInfo: string; //联系方式
}[];

const isListMap = {
  1: { type: "success", label: "已上市" },
  2: { type: "danger", label: "未上市" },
};
const recommandList = await recommandListMap(true, "asdf");
</script>
<template>
  <el-scrollbar class="scroll-warp">
    <el-collapse accordion class="list-warp">
      <el-collapse-item v-for="item in recommandList" :key="item.key" :name="item.key">
        <template #title>
          <div class="description">
            <div class="description-item">
              <el-icon class="iconStyle"><Avatar /></el-icon>
              <label>公司名称：</label>
              {{ item.companyName }}
              <el-tag
                :type="isListMap[item.isList as keyof typeof isListMap].type"
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
  </el-scrollbar>
</template>
<style lang="scss" scoped>
.scroll-warp {
  width: 80vw;
  margin: 0 auto;
  height: 30rem;
  max-height: 30rem;
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
