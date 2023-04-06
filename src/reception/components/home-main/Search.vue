<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { reactive, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { regionMap } from "@/reception/components/home-main/instance";
const isList = ref<boolean>(true);
const radio = ref<string>("unList");
const inputContent = ref<string>("");
// 被选择省份
const select = ref<string>("");
</script>
<template>
  <el-card class="card-warp" body-style="margin:0">
    <div class="search-warp">
      <el-input
        v-model="inputContent"
        placeholder="请输入公司名称"
        class="input-with-select"
      >
        <template #prepend>
          <el-select v-model="select" placeholder="选择省份" style="width: 115px">
            <el-option
              v-for="item in regionMap"
              :label="item.region"
              :value="item.key"
              :key="item.key"
            />
          </el-select>
        </template>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
      <el-switch
        v-model="isList"
        class="switch-content"
        inline-prompt
        active-text="已上市"
        inactive-text="未上市"
      />
    </div>
  </el-card>
</template>
<style lang="scss" scoped>
.card-warp {
  width: 80vw;
  margin: 0 auto;
}
.search-warp {
  margin: 0.5rem auto 0.5rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.input-with-select {
  margin: 0.1rem;
  width: 73vw;
}
.switch-content {
  --el-switch-on-color: #13ce66;
  --el-switch-off-color: #ff4949;
}
</style>
