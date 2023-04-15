<script setup lang="ts">
import DescribeVue from "@/reception/common/Describe.vue";
import AccountHandel from "@/reception/common/Account-handel.vue";
</script>
<template>
  <div class="wrap">
    <div class="personal-wrap">
      <el-card class="card">
        <DescribeVue />
        <el-divider />
        <Account-handel />
      </el-card>
    </div>
  </div>
</template>
<style scoped lang="scss">
.wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  height: 50rem;
}
.personal-wrap {
  display: flex;
  height: 40rem;
  width: 80vw;
  margin: auto 0;
  box-shadow: var(--el-box-shadow-light);
  .card {
    width: 80vw;
  }
}
</style>
