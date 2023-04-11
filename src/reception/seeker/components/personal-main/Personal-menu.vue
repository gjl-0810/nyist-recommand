<script lang="ts" setup>
import { getValue, setValue } from "@/cath";
import router from "@/router";
import { Document, Menu as IconMenu, Location, Setting } from "@element-plus/icons-vue";
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
const menu = [
  { index: "/rep/personal/info", value: "账号信息", icon: Setting },
  { index: "/rep/personal/deliverResume", value: "已投递简历", icon: IconMenu },
];
onMounted(() => {
  const { matched } = useRoute();
  const routePath =
    matched?.[2]?.path === activeKey.value ? activeKey.value : getValue("PersonalNavKey");
  activeKey.value = routePath;
  router.push(routePath);
});

const NavKey = computed({
  get: () => getValue("PersonalNavKey") || menu[0].index,
  set: (key: string) => {
    setValue("PersonalNavKey", key);
  },
});

const activeKey = ref<string>(NavKey.value);

function handleSelect(key: string) {
  NavKey.value = key;
  activeKey.value = key;
}
</script>
<template>
  <div class="el-menu-vertical">
    <el-menu
      :default-active="activeKey"
      @select="handleSelect"
      background-color="#c8c9cc"
      v-for="{ index, icon: Icon, value } in menu"
      router
    >
      <el-menu-item :index="index" :key="index">
        <el-icon v-if="Icon"><Setting /> </el-icon>
        <span>{{ value }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<style scoped lang="scss">
.el-menu-vertical {
  height: 40rem;
  background-color: #c8c9cc;
}
</style>
