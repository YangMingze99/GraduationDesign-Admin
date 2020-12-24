import Vue from "vue";
import App from "./App.vue";
import router from "./router";
//导入ElementUI
import ElementUI from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
//导入axios配置文件
import axios from "@/utils/axios.config.js"
//导入默认样式
import '@/assets/css/reset.css'

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
//使用组件 全局注册
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
