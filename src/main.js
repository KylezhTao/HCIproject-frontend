import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import x2js from "x2js";
import echarts from "echarts";

Vue.prototype.$x2js = new x2js();

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(ElementUI);
//Vue.use(axios);
Vue.prototype.$axios = axios;
new Vue({
  router,
  store,
  data: {
    node: "",
    source: "",
    target: ""
  },
  render: h => h(App)
}).$mount("#app");
