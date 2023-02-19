<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import { ref, reactive } from "vue";
type navDateType =  {
    key: string;
    name: string;
}[]
const navDate = reactive<navDateType>([
  { key: "/rep/home", name: "首页" },
  { key: "/rep/resume", name: "简历模板" },
  { key: "/rep/personal", name: "个人中心" },
]);
const emit = defineEmits<{
  (e: 'change', id: number): void
  (e: 'update', value: string): void
}>()
const activeKey = ref<string>(navDate[0].key);

function handleSelect(key:string) {
    // activeKey.value = key
   console.log(key)
}
</script>
<template>
  <nav>
    <el-menu
    :default-active="activeKey"
    class="el-menu-nav"
    mode="horizontal"
    @select="handleSelect"
    router="true"
  >
    <el-menu-item v-for="item in navDate" :key="item.key" :index="item.key">{{ item.name }}</el-menu-item>
  </el-menu>
  </nav>
</template>

<style lang="scss">

.el-menu-nav{
    display: flex;
    justify-content: center;
}
</style>
