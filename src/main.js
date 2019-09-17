import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VueRouter from "vue-router";
import axios from "axios";
import VueAxios from "vue-axios";
import { Icon } from "vant";
import { Tab, Tabs } from "vant";
import "vant/lib/index.css";
import { Swipe, SwipeItem } from "vant";
import VueLazyLoad from "vue-lazyload";
import "./utils/rem";
import "./filters/index";
import infiniteScroll from "vue-infinite-scroll";
import { Popup } from "vant";
import { Slider } from 'vant';
import { Image } from 'vant';

Vue.use(Image);
Vue.use(Slider);
Vue.use(Popup);
Vue.use(infiniteScroll);
Vue.use(VueLazyLoad);
Vue.use(Swipe).use(SwipeItem);
Vue.use(Tab).use(Tabs);
Vue.use(Icon);

Vue.use(VueAxios, axios);
Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

store.dispatch("getReSongList", axios);
store.dispatch("getNewSongList", axios);
