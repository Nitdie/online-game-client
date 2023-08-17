<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavComponent from "@/components/NavComponent.vue";
import {mainStore} from '@/stores'
import {computed, onBeforeMount, onMounted, provide, ref} from "vue";
import io from "socket.io-client"
import {useRouter} from "vue-router";  const router = useRouter()

const store = mainStore()
const socket = io("http://localhost:8888")
provide("socket",socket)

const userLogged = computed(()=> store.getCurrentUser != '')

if(!userLogged.value)  //未登入则重定向到登陆界面
  router.push('/login')

onBeforeMount(()=>{
  store.setCurrentUser(localStorage.getItem('localUser'))
})

</script>

<template>
  <header>
    <NavComponent v-if="userLogged"></NavComponent>
  </header>
  <RouterView></RouterView>
</template>

<style scoped lang="sass">


</style>
