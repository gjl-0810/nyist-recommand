import { createRouter, createWebHistory } from "vue-router";
import loginOrRegisterVue from "@/views/LoginOrRegister.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "/",
      component: loginOrRegisterVue,
      redirect:'/login',
      children:[ 
        {
        path:'login',
        component: () => import('@/views/LoginPage.vue'),
      },
      {
        path:'registe',
        component: () => import('@/views/RegisterPage.vue'),
      },]
    },
    {
      path: "/rep",
      name: "repHome",
      // 求职者首页
      component: () => import("@/reception/seeker/HomePage.vue"),
      children:[
        {
          path:'home',
          component: () => import('@/reception/seeker/components/home-main/HomeMain.vue'),
        },
        {
          path:'resume',
          component: () => import('@/reception/seeker/components/resume-main/ResumeMain.vue'),
        },
        {
          path:'personal',
          component: () => import('@/reception/seeker/components/personal-main/Personal.vue'),
          redirect:'/rep/personal/info',
          children:[
            {path:'info',component:()=>import('@/reception/seeker/components/personal-main/personal-info/Personal-info.vue')},
            {path:'deliverResume',component:()=>import('@/reception/seeker/components/personal-main/personal-deliver/Personal-deliver-resume.vue')},
          ]
        },
        {
          path:'error',
          component: ()=> import('@/views/ErrorPage.vue')
        }
      ]
    },
    {
      path:"/recommond",
      name:'recommondHome',
      component:()=> import ('@/reception/recomond/RecommondHome.vue'),
      children:[
        {
          path:'home',
          component:()=> import ('@/reception/recomond/component/home/Home.vue'),
        },
        {
          path:'resume',
          component:()=> import ('@/reception/recomond/component/resume/Resume.vue'),
        },
        {
          path:'personal',
          component: () => import('@/reception/recomond/component/personal/Personal.vue'),
        }
      ]
    },
  // 管理后台
    {
        path:'/adminLogin',
        name:'adminLogin',
        component: () => import('@/views/ManageLogin.vue'),
    },
    {
      path:'/manage',
      name:'manage',
      component: () => import('@/ManageStage/Home.vue'),
      children:[
        {
          path:'statistic',
          name:'statistic',
          component: () => import('@/ManageStage/views/statistic/Statistic.vue'),
        },
        {
          path:'internalTempelete',
          name:'internalTempelete',
          component: () => import('@/ManageStage/views/internal_templete/InternalTemplete.vue'),
        },
        {
          path:'recommondList',
          name:'recommondList',
          component: () => import('@/ManageStage/views/recommond_list/RecommondList.vue'),
        },
        {
          path:'resumeList',
          name:'resumeList',
          component: () => import('@/ManageStage/views/resume_list/ResumeList.vue'),
        },
        {
          path:'userList',
          name:'userList',
          component: () => import('@/ManageStage/views/user_list/UserList.vue'),
        },
      ]
  },
  ],
});
// router.beforeEach(async (to, from) => {
//   const isLogin = localStorage.getItem('login');
//   // 路由跳转之前判断登录状态
//   if (!isLogin && to.name!=='login') {
//     // 未登录将用户重定向到登录页面
//     return { name: 'login' }
//   }
// })
export default router;
