<script setup lang="ts">
import {mainStore} from "@/stores";  const store = mainStore()

const emit = defineEmits(['select-event']);

function setShip1(){
  store.game1type = 'spaceShip1'
  emit('select-event');
}
function setShip2(){
  store.game1type = 'spaceShip2'
  emit('select-event');
}
function setShip3(){
  store.game1type = 'spaceShip3'
  emit('select-event');
}
function setShip4(){
  store.game1type = 'spaceShip4'
  emit('select-event');
}


</script>

<template>
  <el-container class="all-container">
  <h1>选择机型</h1>
  <el-container class="each-container">
    <el-aside width="40vw">
      <img src="@/games/game1/assets/imgs/spaceShip.png" class="main-img">
    </el-aside>
    <el-container>
      <el-header>
        <el-divider>
          <h1 style="font-size: 30px">T01</h1>
        </el-divider>
      </el-header>
      <el-main>
        <h4 style="font-size: 20px">测试用基础机型，各项能力比较平衡，发射M1小型导弹。</h4>
        <el-button plain @click="setShip1" style="width: 50%;margin-left: 20%;margin-top:10%">选择</el-button>
      </el-main>
    </el-container>
  </el-container>
    <el-container class="each-container">
      <el-aside width="40vw">
        <img src="@/games/game1/assets/imgs/spaceShips2.png" class="main-img">
      </el-aside>
      <el-container>
        <el-header>
          <el-divider>
            <h1 style="font-size: 30px">S01</h1>
          </el-divider>
        </el-header>
        <el-main>
          <h4 style="font-size: 20px">火力强劲，机动性略差的机型，发射双管激光炮。</h4>
          <el-button plain @click="setShip2" style="width: 50%;margin-left: 20%;margin-top:10%">选择</el-button>
        </el-main>
      </el-container>
    </el-container>
    <el-container class="each-container">
      <el-aside width="40vw">
        <img src="@/games/game1/assets/imgs/spaceShips3.png" class="main-img">
      </el-aside>
      <el-container>
        <el-header>
          <el-divider>
            <h1 style="font-size: 30px">F01</h1>
          </el-divider>
        </el-header>
        <el-main>
          <h4 style="font-size: 20px">高机动性机型，发射具有追踪能力的M2中型导弹。</h4>
          <el-button plain @click="setShip3" style="width: 50%;margin-left: 20%;margin-top:10%">选择</el-button>
        </el-main>
      </el-container>
    </el-container>
    <el-container class="each-container">
      <el-aside width="40vw">
        <img src="@/games/game1/assets/imgs/spaceShips4.png" class="main-img">
      </el-aside>
      <el-container>
        <el-header>
          <el-divider>
            <h1 style="font-size: 30px">Q01</h1>
          </el-divider>
        </el-header>
        <el-main>
          <h4 style="font-size: 20px">重型机型，速度缓慢但破坏性强，发射高能激光炮。</h4>
          <el-button plain @click="setShip4" style="width: 50%;margin-left: 20%;margin-top:10%">选择</el-button>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>

<style scoped lang="sass">
.all-container
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  width: 100%

.each-container
  margin-right: 10vw
  margin-left: 10vw
  margin-top: 10vh
  margin-bottom: 10vh
  width: 80vw

.main-img
  max-height: 66%
  margin-top: 5vh
  margin-bottom: 5vh
  margin-left: 10vw
  margin-right: 10vw

.sub-img
  transform: rotate(90deg)
  height: 50%

h4
  width: 100%

</style>