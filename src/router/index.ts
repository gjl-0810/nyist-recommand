import { createRouter, createWebHistory } from "vue-router";
import loginOrRegisterVue from "@/views/LoginOrRegister.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: loginOrRegisterVue,
    },
    {
      path: "/rep",
      name: "repHome",
      // 前台首页
      component: () => import("@/reception/views/HomePage.vue"),
      children:[
        {
          path:'home',
          component: () => import('@/reception/components/home-main/HomeMain.vue'),
        },
        {
          path:'resume',
          component: () => import('@/reception/components/home-main/HomeMain.vue'),
        },
        {
          path:'personal',
          component: () => import('@/reception/components/home-main/HomeMain.vue'),
        },
        {
          path:'error',
          component: ()=> import('@/views/ErrorPage.vue')
        }
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
