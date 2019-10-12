import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vueDebounce from "vue-debounce";
import VueChatScroll from "vue-chat-scroll";

Vue.use(vueDebounce);
Vue.use(VueChatScroll);

if (process.env.NODE_ENV !== "production") {
  Vue.config.productionTip = false;
  Vue.config.performance = true;
  Vue.config.devtools = true;
  Vue.config.warnHandler = (msg, vm, trace) => {
    console.group();
    console.warn(msg);
    console.log(vm);
    console.log(trace);
    console.groupEnd();
  };
}
Vue.config.errorHandler = (err, vm, info) => {
  console.group();
  console.error(err);
  console.log(vm);
  console.log(info);
  console.groupEnd();
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
