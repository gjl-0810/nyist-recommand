<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { regionData } from "@/reception/seeker/components/home-main/instance";
import { ref } from "vue";
const cascader = ref(null);
const searchInfo = defineProps<{
  isList: number;
  handelIsList: (value: number) => void;
  searchInput: string;
  handelInput: (value: string) => void;
  position: string;
  handelPosition: (value: string) => void;
}>();
</script>
<template>
  <el-card class="card-warp" body-style="margin:0">
    <div class="search-warp">
      <el-input
        ref="cascader"
        v-model="searchInfo.searchInput"
        @change="searchInfo.handelInput"
        placeholder="请输入公司名称"
        class="input-with-select"
      >
        <template #prepend>
          <el-cascader
            placeholder="请输入/选择地址"
            filterable
            v-model="searchInfo.position"
            clearable
            :options="regionData"
            @change="searchInfo.handelPosition"
          />
        </template>
        <template #append>
          <el-button :icon="Search" />
        </template>
      </el-input>
      <el-switch
        v-model="searchInfo.isList"
        @change="searchInfo.handelIsList"
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
