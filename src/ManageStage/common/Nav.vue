<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { House, Document, Setting, Notebook, User } from "@element-plus/icons-vue";
import { ADMIN_NAV_KEY } from "@/cath";
const navDate = [
  { key: "/manage/statistic", name: "信息统计", icon: House },
  { key: "/manage/internalTempelete", name: "简历模板管理", icon: Document },
  { key: "/manage/recommondList", name: "内推职位管理", icon: Notebook },
  { key: "/manage/resumeList", name: "简历状态管理", icon: Setting },
  { key: "/manage/userList", name: "用户信息管理", icon: User },
];
onMounted(() => {
  activeKey.value = changeRoute.value;
  router.push(changeRoute.value);
});
const NAVKey = computed({
  // get set 无法识别间接返回类型 故使用原生 localStorage
  get: () => localStorage.getItem(ADMIN_NAV_KEY) || navDate[0].key,
  set: (key) => {
    localStorage.setItem(ADMIN_NAV_KEY, key);
  },
});
const changeRoute = computed(() => {
  const { matched } = useRoute();
  return matched[1].path === activeKey.value ? activeKey.value : matched[1].path;
});
const activeKey = ref<string>(NAVKey.value);
function handleSelect(key: string) {
  NAVKey.value = key;
  activeKey.value = key;
}
</script>
<template>
  <nav>
    <el-menu :default-active="activeKey" @select="handleSelect" router>
      <el-menu-item v-for="item in navDate" :key="item.key" :index="item.key">
        <template #title>
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </nav>
</template>
