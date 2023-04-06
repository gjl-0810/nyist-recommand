<script setup lang="ts">
import Header from "../common/Header.vue";
import Footer from "../common/Footer.vue";
import Nav from "../common/Nav.vue";
</script>
<template>
  <div class="warp">
    <Header class="header" />
    <Nav class="nav" />
    <main>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
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
  height: 60rem;
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
</style>
