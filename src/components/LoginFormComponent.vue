<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { inject, ref } from 'vue'
import AuthenticationService from '@/services/AuthenticationService'
import { mainStore } from '@/stores'
const store = mainStore()
import { useRouter } from 'vue-router'
const router = useRouter()

const formData = {
    username: '',
    password: ''
}

let form = ref({
    username: '',
    password: ''
})

let isInputWrong = ref(false)
async function login() {
    try {
        const response = await AuthenticationService.login({
            username: form.value.username,
            password: form.value.password
        })
        //登陆成功
        localStorage.setItem('localUser', form.value.username)
        store.setCurrentUser(form.value.username)
        isInputWrong.value = false
        router.push('./')
    } catch (error) {
        isInputWrong.value = true
    }
}
</script>

<template>
    <div class="form-container">
        <h2>用户登陆</h2>
        <el-divider />
        <el-form label-width="70px">
            <div class="input_hint" v-show="isInputWrong">账号或密码错误</div>
            <el-form-item label="用户名">
                <el-input prefix-icon="User" v-model="form.username" class="text-input" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input
                    @keyup.enter="login"
                    type="password"
                    prefix-icon="Lock"
                    v-model="form.password"
                    class="text-input"
                />
            </el-form-item>
            <el-button class="login_button" @click="login">登陆</el-button>
        </el-form>
    </div>
</template>

<style scoped lang="sass">
.form-container
  background-color: #ffffff
  width: 30vw
  padding: 15px 15px 30px
  text-align: center
  border: 1px solid #e5e5e5
  box-shadow: 0px 1px 0.1px 1px #b7b7b7

  .h
    padding: 20px

  .text-input
    width: 230px

  .input_hint
    position: absolute
    height: 10px
    margin-left: 120px
    margin-top: -19px
    color: red
    font-size: 1px

  .login_button
    width: 100px
</style>
