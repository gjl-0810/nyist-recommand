<script setup lang="ts">
import StatisticVue from "./Statistic.vue";
import DescribeVue from "@/reception/common/Describe.vue";
import AccountHandel from "@/reception/common/Account-handel.vue";
</script>
<template>
  <el-card class="personal-info">
    <StatisticVue />
    <el-divider />
    <DescribeVue />
    <el-divider />
    <Account-handel />
  </el-card>
</template>
<style scoped lang="scss">
.personal-info {
  display: flex;
}
.el-descriptions {
  text-align: center;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 20px;
}
</style>
