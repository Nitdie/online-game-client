<script setup lang="ts">
import GameLayoutComponent from '@/components/GameLayoutComponent.vue'
import { gameSetUp } from '@/games/game1'
import {inject, onMounted, ref,onBeforeUnmount} from 'vue'
const socket:any = inject("socket")

onMounted(() => {
    socket.emit('player_enter')
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
    gameSetUp(canvas)
})

onBeforeUnmount(()=>{
    socket.emit('player_quit')
})


const showGame = ref(false)

</script>

<template>
<!--    <el-container class="all-container" v-if="!showGame">-->
<!--      <el-main class="enter-container">-->
<!--        <div class="canvas-hide">-->
<!--          开始-->
<!--        </div>-->
<!--      </el-main>-->
<!--    </el-container>-->
    <GameLayoutComponent> </GameLayoutComponent>
    <!--  可以在此处加载图片但不显示，节省时间 -->
    <img id="spaceShip" class='gameImage' src="@/games/game1/assets/imgs/spaceShip.png" />
    <img id="BackGround" class='gameImage' src="@/games/game1/assets/imgs/BackGround.jpg" />
    <img id="Missile1" class='gameImage' src="@/games/game1/assets/imgs/Missile1.png" />
    <audio controls ref="" id="Missile1Shoot" class="gameAudio" src="/Missile1Shoot.wav" preload="auto"></audio>
</template>

<style scoped lang="sass">
//@import '@/assets/styles/index'
//
//.all-container
//  background-color: #f1f1f1
//  height: $MAIN-HEIGHT
//
//  .enter-container
//    display: flex
//    justify-content: center
//    align-items: center
//    height: 80vh
//    width: 80vw
//    margin: 30px
//
//    .canvas-hide
//      background-color: rgba(255, 255, 255, 0.5)
//      display: flex
//      width: 800px
//      height: 500px
//      align-self: center
//      justify-self: center
//      text-align: center
//      border: 2px solid #d9d9da

.gameImage, .gameAudio
  display: none
</style>
