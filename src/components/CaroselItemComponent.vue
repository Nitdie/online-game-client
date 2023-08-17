<script setup lang="ts">
import {useRouter} from "vue-router"; const router = useRouter()

interface Props{
  pageId: number
}
const props = withDefaults(defineProps<Props>(),{
  pageId:0
})

function enterGame(){
  switch (props.pageId){
    case 1:
      router.push('/game1')
          break
    case 2:
      router.push('/game2')
          break
    case 3:
      router.push('/game3')
          break
  }
}

</script>

<template>
  <el-container>
    <el-aside width="40vw">
      <img v-if="props.pageId==1" src="@/assets/imgs/GameCover1.jpg" alt="Img1">
      <img v-if="props.pageId==2" src="@/assets/imgs/GameCover2.jpg" alt="Img2">
      <img v-if="props.pageId==3" src="@/assets/imgs/GameCover3.jpg" alt="Img3">
    </el-aside>
    <el-container>
      <el-header>
        <h1>游戏名</h1>
        <p>游戏描述</p>
      </el-header>
      <el-main>
        <p>游戏教程</p>
        <el-button plain @click="enterGame">进入游戏</el-button>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="sass">
img
  height: 500px

</style>