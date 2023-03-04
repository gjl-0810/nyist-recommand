<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup>
import router from "@/router";
import { ref, reactive, computed, onMounted } from "vue";
import { useRoute, type RouteLocationMatched } from "vue-router";
type navDateType = {
  key: string;
  name: string;
}[];
const navDate = reactive<navDateType>([
  { key: "/rep/home", name: "首页" },
  { key: "/rep/resume", name: "简历模板" },
  { key: "/rep/personal", name: "个人中心" },
]);

onMounted(() => {
  activeKey.value = changeRoute.value;
  router.push( changeRoute.value );
});

const emit = defineEmits<{
  (e: "change", id: number): void;
  (e: "update", value: string): void;
}>();
const NAVKey = computed({
  get: () => localStorage.getItem("NAVKey") || navDate[0].key,
  set: (key) => {
    localStorage.setItem("NAVKey", key);
  },
});
const changeRoute = computed(
  () => {
   const { matched } = useRoute();
   return  matched[1].path === activeKey.value ? activeKey.value :  matched[1].path
  })
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
      <el-menu-item v-for="item in navDate" :key="item.key" :index="item.key">{{
        item.name
      }}</el-menu-item>
    </el-menu>
  </nav>
</template>

<style lang="scss">
.el-menu-nav {
  display: flex;
  justify-content: center;
}
</style>
