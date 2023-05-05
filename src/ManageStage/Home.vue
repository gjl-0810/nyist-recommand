<script setup lang="ts">
import Header from "./common/Header.vue";
import Nav from "./common/Nav.vue";
</script>
<template>
  <div class="warp">
    <Header />
    <section class="section">
      <Nav class="el-menu-nav" />
      <main>
        <router-view v-slot="{ Component }">
          <transition name="slide-fade">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </section>
  </div>
</template>
<style scoped lang="scss">
.warp {
  position: absolute;
  top: 0;
  width: 100%;
  box-sizing: border-box;
}
.section {
  display: flex;
  flex-wrap: wrap;
  min-width: 80rem;
  .el-menu-nav {
    max-width: 10rem;
  }
  main {
    flex: 1;
    min-width: 60rem;
    width: 100%;
  }
}
.slide-fade-enter-active {
  transition: all 1s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.6s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translate(-1rem);
  opacity: 0;
}
</style>
