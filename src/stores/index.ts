import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const mainStore = defineStore('main', {
  state:()=>({
    currentUser:'',
    currentRoomId:'',
  }),
  getters:{
    getCurrentUser() :string {
      return this.currentUser
    },
    getCurrentRoomId() :string {
      return this.currentRoomId
    }
  },
  actions:{
    setCurrentUser(user:string){
      this.currentUser = user
    },
    setCurrentRoomId(roomId:string){
      this.currentRoomId = roomId
    }
  }
})
