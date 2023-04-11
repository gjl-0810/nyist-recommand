<!-- eslint-disable vue/multi-word-component-names -->
<script lang="ts" setup></script>
<template>
  <el-carousel class="carousel-warp" indicator-position="outside">
    <el-carousel-item v-for="item in 4" :key="item">
      <h3 text="2xl" justify="center">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss">
.carousel-warp {
  width: 80vw;
  overflow-y: hidden;
  margin: 0 auto;
  max-height: 20rem;
}
.carousel-warp h3 {
  display: flex;
  color: #475669;
  opacity: 0.75;
  line-height: 15.75rem;
  margin: 0;
}

.carousel-warp:nth-child(2n) {
  background-color: #99a9bf;
}

.carousel-warp:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
