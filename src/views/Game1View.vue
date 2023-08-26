<script setup lang="ts">
import GameLayoutComponent from '@/components/GameLayoutComponent.vue'
import { gameSetUp } from '@/games/game1'
import { inject, onMounted, ref } from 'vue'
import { mainStore } from '@/stores'
const store = mainStore()

const socket: any = inject('socket')
store.setCurrentUser(socket.id)
localStorage.setItem('localUser', socket.id)
onMounted(() => {
    socket.emit('player_enter_one', store.getCurrentUser)
    socket.on('send_room_id', (roomId: any) => {
        store.setCurrentRoomId(roomId)
    })
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
    gameSetUp(canvas, socket)
})

const showGame = ref(false)
</script>

<template>
    <GameLayoutComponent> </GameLayoutComponent>
    <!--  可以在此处加载图片但不显示，节省时间 -->
    <img id="spaceShip1" class="gameImage" src="@/games/game1/assets/imgs/spaceShip.png" />
    <img id="spaceShip2" class="gameImage" src="@/games/game1/assets/imgs/spaceShips2.png" />
    <img id="spaceShip3" class="gameImage" src="@/games/game1/assets/imgs/spaceShips3.png" />
    <img id="spaceShip4" class="gameImage" src="@/games/game1/assets/imgs/spaceShips4.png" />
    <img id="spaceShip2Hurt" class="gameImage" src="@/games/game1/assets/imgs/spaceShips2-hurt.png" />
    <img id="spaceShip3Hurt" class="gameImage" src="@/games/game1/assets/imgs/spaceShips3-hurt.png" />
    <img id="spaceShip4Hurt" class="gameImage" src="@/games/game1/assets/imgs/spaceShips4-hurt.png" />
    <img
        id="spaceShip1Hurt"
        class="gameImage"
        src="@/games/game1/assets/imgs/spaceShips1-hurt.png"
    />
    <img id="BackGround" class="gameImage" src="@/games/game1/assets/imgs/BackGround.jpg" />
    <img id="Missile1" class="gameImage" src="@/games/game1/assets/imgs/Missile1.png" />
    <img id="Laser1" class="gameImage" src="@/games/game1/assets/imgs/laser1.png" />
    <img id="Missile2" class="gameImage" src="@/games/game1/assets/imgs/missile2.png" />
    <img id="Laser2" class="gameImage" src="@/games/game1/assets/imgs/laser2.png" />
    <img
        id="ExplosionEffect1"
        class="gameImage"
        src="@/games/game1/assets/imgs/explosionEffect-small.png"
    />    <img
        id="Laser1Explosion"
        class="gameImage"
        src="@/games/game1/assets/imgs/laser1Explosion.png"
    /><img
        id="Missile2Explosion"
        class="gameImage"
        src="@/games/game1/assets/imgs/missile2Explosion.png"
    /><img
        id="Laser2Explosion"
        class="gameImage"
        src="@/games/game1/assets/imgs/laser2Explosion.png"
    />


    <audio
        controls
        ref=""
        id="Missile1Shoot"
        class="gameAudio"
        src="/Missile1Shoot.wav"
        preload="auto"
    ></audio>
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
