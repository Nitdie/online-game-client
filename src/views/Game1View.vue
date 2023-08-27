<script setup lang="ts">
import GameLayoutComponent from '@/components/GameLayoutComponent.vue'
import Game1ShipSelectComponent from "@/components/game1/Game1ShipSelectComponent.vue";
import { gameSetUp } from '@/games/game1'
import { inject, onMounted, ref } from 'vue'
import { mainStore } from '@/stores'
import io from "socket.io-client";
const store = mainStore()

// const socket: any = inject('socket')
// store.setCurrentUser(socket.id)
// localStorage.setItem('localUser', socket.id)
const chose = ref(false)
onMounted(() => {

})

function handleSelectEvent(){
  chose.value = true
  const socket = io('http://localhost:8888')
  setTimeout(()=>{


    socket.emit('player_enter_one', socket.id)
    socket.on('send_room_info', (data: any) => {
      store.setCurrentRoomId(data.roomId)
    })
    const canvas = document.getElementById('GameCanvas') as HTMLCanvasElement
    gameSetUp(canvas, socket)
  },100)
}

</script>

<template>
  <div>
    <Game1ShipSelectComponent @select-event="handleSelectEvent" v-if="!chose">CHOOSE</Game1ShipSelectComponent>
    <GameLayoutComponent v-if="chose"> </GameLayoutComponent>
  </div>

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
.gameImage, .gameAudio
  display: none
</style>
