<script setup lang="ts">
import Header from "@/reception/common/Header.vue";
import Footer from "@/reception/common/Footer.vue";
import ReNav from "./common/ReNav.vue";
</script>
<template>
  <div class="warp">
    <Header class="header" />
    <ReNav class="nav" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="slide-fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <Footer class="footer" />
  </div>
</template>
<style lang="scss" scoped>
.warp {
  overflow-x: hidden;
  width: 100vw;
  height: 100vh;
}
main {
  box-sizing: border-box;
  height: 50rem;
}
.header {
  line-height: 2.6rem;
  height: 2.6rem;
}
.nav {
  height: 3.8rem;
}
.footer {
  height: 1.6rem;
}
// 动画组件
.slide-fade-enter-active {
  transition: all 2s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(10rem);
  opacity: 0;
}
</style>
