<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { recommandListMap } from "./apiTest";
import { Avatar, Position } from "@element-plus/icons-vue";
import { fuzzy } from "@/http/reception";
import { bottom } from "@popperjs/core";
export type listMsgMap = {
  key: string;
  isList: boolean; //是否上市
  position: string; //工作地点
  count: number; //招聘人数
  companyName: string; //公司名称
  recommandInfo: string; //招聘内容
  internalPromotionPost: string; //内推岗位
  companyProfile: string; //公司简介
  contactInfo: string; //联系方式
}[];

const isListMap = new Map([
  [true, { type: "success", label: "已上市" }],
  [false, { type: "danger", label: "未上市" }],
]);

const recommandList = await recommandListMap(true, "asdf");
</script>
<template>
  <el-scrollbar class="scroll-warp">
    <el-collapse accordion class="list-warp">
      <el-collapse-item v-for="item in recommandList" :key="item.key" :name="item.key">
        <template #title class="main-description">
          <div class="description">
            <el-icon class="iconStyle"><Avatar /></el-icon>
            公司名称：{{ item.companyName }}
          </div>
          <div>
            <label>推荐岗位：</label>
            {{ item.internalPromotionPost }}
          </div>
          <div>
            <el-icon class="iconStyle"><Position /></el-icon> 招聘人数：{{ item.count }}
          </div>
          <el-tag
            :type="isListMap.get(item.isList)?.type"
            class="isList-tag"
            effect="light"
          >
            {{ isListMap.get(item.isList)?.label }}
          </el-tag>
        </template>
        <div><label>公司简介：</label> {{ item.companyProfile }}</div>
        <div>
          <label>招聘简介：</label>
          {{ item.recommandInfo }}
        </div>
        <div>
          <el-icon class="iconStyle"><Position /></el-icon>
          工作地点：{{ item.position }}
        </div>

        <div>
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
  height: 50rem;
  max-height: 50rem;
}
.iconStyle {
  margin: 0 0.5rem;
  vertical-align: middle;
}
.isList-tag {
  margin-left: 0.875rem;
}
</style>
