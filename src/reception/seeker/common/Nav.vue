<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { House, Document, User } from "@element-plus/icons-vue";
import { NAV_KEY } from "@/cath";
const navDate = [
  { key: "/rep/home", name: "首页", icon: House },
  { key: "/rep/resume", name: "简历模板", icon: Document },
  { key: "/rep/personal", name: "个人中心", icon: User },
];
onMounted(() => {
  activeKey.value = changeRoute.value;
  router.push(changeRoute.value);
});
const NAVKey = computed({
  // get set 无法识别间接返回类型 故使用原生 localStorage
  get: () => localStorage.getItem(NAV_KEY) || navDate[0].key,
  set: (key) => {
    localStorage.setItem(NAV_KEY, key);
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
    <el-menu
      :default-active="activeKey"
      class="el-menu-nav"
      mode="horizontal"
      @select="handleSelect"
      router
    >
      <el-menu-item v-for="item in navDate" :key="item.key" :index="item.key">
        <template #title>
          <el-icon><component :is="item.icon"></component></el-icon>
          <span>{{ item.name }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<style lang="scss">
.el-menu-nav {
  display: flex;
  justify-content: center;
}
</style>
