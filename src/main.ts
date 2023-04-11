import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";
import {ElCascader} from 'element-plus'
// 为了使用省市级级联选择，由于使用其他依赖，无法自动导入解析，提前引入
import "./assets/main.css";
import 'element-plus/theme-chalk/el-loading.css';
import 'element-plus/theme-chalk/el-message.css';
const pinia = createPinia()
const app = createApp(App);

app.use(ElCascader).use(pinia);
app.use(router);

app.mount("#app");
