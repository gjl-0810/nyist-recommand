import type { listMsgMap } from "./RecruitProfileList.vue"
import { request } from "@/http/index";
import { testApi } from "@/utils/util";


export const recommandListMap =  (isList:boolean,listName:string):Promise<listMsgMap> =>{
    const c =[
    {
        key:'a',isList:2,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:'oasidhfiopashndfiophnasp9odfnauiopsbdfiasbsvidbn/哦啊见谁都烦死哦对河南佛奥河南啊搜到回复骄傲和你说的烦恼时间段内佛，uifhasndofpasndf9paosdnfp1n1，啊搜到合法欧舒丹念佛爱上你都放那搜到你。阿萨德列举法搜到今年法搜DNF，啊搜到合法死哦DNFOA十多年佛呢'
    },
    {
        key:'b',isList:1,count:2,companyName:'腾讯云智研发',position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
    {
        key:'c',isList:2,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
    {
        key:'d',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
    {
        key:'v',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
    {
        key:'m',isList:2,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
    {
        key:'g1',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g2',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g4',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g5',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g7',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    }, {
        key:'g49',isList:1,count:2,companyName:'腾讯云智研发', position:'西安', contactInfo:'腾讯全资子公司',recommandInfo:'前端开发实习生',
        internalPromotionPost:'1915925297',companyProfile:''
    },
   ]
   return testApi(1000,c);
   
}