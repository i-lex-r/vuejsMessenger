import Vue from "vue";
import Router from "vue-router";
import Messenger from "./views/Messenger";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/chat/:chatId",
      component: Messenger,
      props: true
    },
    {
      alias: "/",
      path: "/chat",
      component: Messenger
    },
    {
      path: "*",
      redirect: "/chat"
    }
  ]
});
