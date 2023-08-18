<script setup lang="ts">
import GameLayoutComponent from "@/components/GameLayoutComponent.vue";
import {gameSetUp} from "@/games/game1";
import {onMounted} from "vue";

onMounted(()=>{
  const canvas = document.getElementById('GameCanvas')
  gameSetUp(canvas)
})

</script>

<template>
  <GameLayoutComponent>

  </GameLayoutComponent>
</template>

<style scoped lang="sass">

</style>