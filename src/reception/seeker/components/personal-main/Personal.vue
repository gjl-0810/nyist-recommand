<script setup lang="ts">
import PersonalMenu from "./Personal-menu.vue";
</script>
<template>
  <div class="wrap">
    <div class="personal-wrap">
      <PersonalMenu> </PersonalMenu>
      <router-view class="personal"></router-view>
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
  width: 80vw;
}
.personal-wrap {
  display: flex;
  height: 40rem;
  width: 80vw;
  margin: auto 0;
  box-shadow: var(--el-box-shadow-light);
}
</style>
