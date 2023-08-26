<script setup lang="ts">
import { mainStore } from '@/stores'
const store = mainStore()
import { useRouter } from 'vue-router'
const router = useRouter()
import { ref } from 'vue'

// const currentUser = ref(store.getCurrentUser)

const activeIndex = ref('0')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

async function logout() {
    store.setCurrentUser('')
    // localStorage.setItem('localUser', '')
    await router.push('/login')
}
</script>

<template>
    <el-menu class="el-menu-demo" mode="horizontal" :ellipsis="false">
        <el-menu-item index="0">主页</el-menu-item>
        <div class="flex-grow" />
        <el-menu-item index="1">Processing Center</el-menu-item>
        <el-sub-menu index="2" class="sub">
            <template #title>{{ store.getCurrentUser }}</template>
            <el-menu-item index="2-1">个人资料</el-menu-item>
            <el-menu-item index="2-2">我的好友</el-menu-item>
            <el-menu-item index="2-3" @click="logout">登出</el-menu-item>
        </el-sub-menu>
    </el-menu>
</template>

<style scoped lang="sass">
.flex-grow
  flex-grow: 1

.el-menu-demo
  height: 8vh
  user-select: none
</style>
