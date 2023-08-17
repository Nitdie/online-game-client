<script setup lang="ts">
import LoginFormComponent from "@/components/LoginFormComponent.vue";
import {onBeforeMount} from "vue";
import {mainStore} from "@/stores"; const store=mainStore()
import {useRouter} from "vue-router";  const router = useRouter()

onBeforeMount(()=>{
  console.log('In Mount')
  if(store.getCurrentUser!=''){
    console.log(2)
    router.push('/')
  } //用户已经登陆

})
console.log('In Set')

</script>

<template>
  <el-container class="all-container">
    <el-main class="main-container">
      <login-form-component></login-form-component>
    </el-main>
    <el-footer class="footer-container">
      <div style="color: rgba(0,05,05,0.2);margin-bottom: 10px">Created By Nitdie</div>
      <a href="https://beian.miit.gov.cn/" style="color: rgba(0,05,05,0.2);text-decoration:none">赣ICP备2023004095号</a>
    </el-footer>
  </el-container>

</template>

<style scoped lang="sass">
.all-container
  background-color: #f5f5f5
  flex-direction: column
  justify-content: center
  align-items: center
  margin: 3px
  height: 97vh

.main-container
  background-color: #f5f5f5
  display: flex
  align-items: center

.footer-container
  display: flex
  flex-direction: column
  margin-top: 10px
  margin-bottom: -10px
</style>