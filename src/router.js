import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import MV from "./views/MV/MV.vue";
import ListOfSongs from "./views/ListOfSongs/ListOfSongs";
import Search from "./views/Search/Search";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue")
    },
    {
      path: "/mv/:id",
      name: "mv",
      component: MV
    },
    {
      path: "/listofsong/:id",
      name: "listofsong",
      component: ListOfSongs
    },
    {
      path: "/search",
      name: "search",
      component: Search
    }
  ]
});
