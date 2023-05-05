import { setValue } from '@/cath';
import { EMAIL, USER_NICk_NAME, getValue } from '@/cath';
import { defineStore } from "pinia";

export const useAccountInfoStore = defineStore("userInfo", {
  state: () => {
    return {
      email:getValue(EMAIL),
      nickName:getValue(USER_NICk_NAME),
    }
  },
  actions:{
    handelEmail(email:string){
      setValue(EMAIL,email)
    },
    handelNickName(nickName:string){
      setValue(USER_NICk_NAME,nickName)
    },
  }
});
