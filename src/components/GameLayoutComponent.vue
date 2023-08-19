<script setup lang="ts">
import { Back } from '@element-plus/icons-vue'
</script>

<template>
    <el-container class="all-container">
        <el-main class="canvas-container">
            <canvas id="GameCanvas"></canvas>
        </el-main>
    </el-container>
</template>

<style scoped lang="sass">
@import '@/assets/styles/index'

.all-container
  background-color: $BACKCOLOR
  height: $MAIN-HEIGHT

.canvas-container
  //background-color: white
  display: flex
  justify-content: center
  height: 80vh
  width: 80vw
  margin: 20px

#GameCanvas
  //background-color: #636363
  display: flex
  align-self: center
  justify-self: center
  border: 2px solid black
  cursor: none
</style>
