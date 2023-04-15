import { IS_LIST, getValue } from '@/cath';
import type { CascaderValue } from 'element-plus/es/components/cascader-panel/src/types';
import { defineStore } from "pinia";

export const useSearchStore = defineStore("searchInfo", {
  state: () => {
    return {
      isList: Number(getValue(IS_LIST))||1, //是否上市
      searchInput:'',//搜索输入框
      position:'' as CascaderValue, //公司地点
    }
  },
  actions:{
    handelIsList(value:number){
      this.isList = value;
    },
    handelPosition(value:string){
      this.position = value;
    },
    handelInput(value:string){
        this.searchInput = value;
    },
  }
});
