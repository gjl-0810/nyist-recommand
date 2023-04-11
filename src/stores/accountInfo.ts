import { defineStore } from "pinia";

export const useAccountInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      email: '',
      nickName:''
    }
  },
  actions:{
    handelEmail(email:string){
      this.email = email
    },
    handelNickName(nickName:string){
      this.nickName = nickName
    },
  }
});
