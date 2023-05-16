<script setup lang="ts"></script>
<template>
  <main>
    <el-card style="width: 45rem">
      <div class="cardPage">
        <img class="img" src="@/assets/logo.svg" alt="logo" />
        <div style="width: 20rem">
          <h1 class="headerTip">NYIST-WR</h1>
          <router-view v-slot="{ Component }">
            <transition name="slide-fade">
              <keep-alive>
                <component :is="Component" />
              </keep-alive>
            </transition>
          </router-view>
        </div>
      </div>
    </el-card>
  </main>
</template>

<style lang="scss" scoped>
.cardPage {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  box-sizing: border-box;
  width: 43rem;
}
.img {
  width: 20rem;
  height: 20rem;
}
.headerTip {
  box-sizing: border-box;
  text-align: center;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s ease-in;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-50px);
  opacity: 0;
}
// @media (max){

// }
</style>
