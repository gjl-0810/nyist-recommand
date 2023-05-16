<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { reactive, toRefs } from "vue";
type FooteDateType = {
  content: string;
  connect: string;
};
const footerDate = reactive<FooteDateType>({
  content: "权限所有@ gjl",
  connect: "a",
});
const { content, connect } = toRefs(footerDate);
</script>
<template>
  <footer class="footer">
    <span>{{ content }}</span>
    <!-- <img src="connect" alt="wechat-connection" /> -->
  </footer>
</template>

<style lang="scss">
.footer {
  display: flex;
  justify-content: center;
  width: 100vw;
}
</style>
