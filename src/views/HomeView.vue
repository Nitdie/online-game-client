<script setup lang="ts">
import CaroselItemComponent from "@/components/CaroselItemComponent.vue";

</script>

<template>
  <el-container>
    <el-main class="main-container">
      <el-carousel indicator-position="outside" height="auto" pause-on-hover trigger="click">
        <el-carousel-item v-for="item in 3" :key="item" style="height:auto">
          <CaroselItemComponent :pageId="item" />
        </el-carousel-item>
      </el-carousel>
    </el-main>
  </el-container>
</template>

<style scoped lang="sass">
@import "@/assets/styles/index"

.main-container
  background-color: $BACKCOLOR
  height: 88vh

.footer-container
  display: flex
  align-self: center

.item-page
  background-color: azure
  height: 70vh


</style>