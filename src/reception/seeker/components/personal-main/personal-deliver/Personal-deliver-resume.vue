<script lang="ts" setup>
import { ref, reactive } from "vue";
import { Calendar, Check, DArrowRight } from "@element-plus/icons-vue";
import router from "@/router";
import DeliveredResume from "./Delivered-resume.vue";
import Delivering from "./Delivering.vue";
import OfferedResume from "./Offered-resume.vue";

const activeName = ref("deliverd");
const tabChange = (name: string) => {
  activeName.value = name;
};
</script>
<template>
  <el-tabs
    type="border-card"
    v-model="activeName"
    @tab-change="tabChange"
    class="resume-tabs"
  >
    <el-tab-pane label="已投递" name="deliverd" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><calendar /></el-icon>
          <span>已投递</span>
        </span>
      </template>
      <keep-alive>
        <DeliveredResume />
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane label="面试中" name="deliving" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><DArrowRight /></el-icon>
          <span>面试中</span>
        </span>
      </template>
      <keep-alive>
        <Delivering />
      </keep-alive>
    </el-tab-pane>
    <el-tab-pane label="已结束" name="over" class="tab">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon><Check /></el-icon>
          <span>已结束</span>
        </span>
      </template>
      <keep-alive>
        <OfferedResume />
      </keep-alive>
    </el-tab-pane>
  </el-tabs>
</template>
<style lang="scss" scoped>
.resume-tabs {
  width: 100%;
}
.tab {
  margin: 0 auto;
  width: 100%;
}
.custom-tabs-label .el-icon {
  vertical-align: middle;
}
.custom-tabs-label span {
  vertical-align: middle;
  margin-left: 4px;
}
</style>
