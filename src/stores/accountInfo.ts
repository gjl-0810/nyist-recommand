import { USER_NICk_NAME, getValue } from '@/cath';
import { defineStore } from "pinia";

export const useAccountInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      email: '',
      nickName:getValue(USER_NICk_NAME)||'',
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
