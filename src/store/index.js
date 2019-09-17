import Vue from "vue";
import Vuex from "vuex";
import RecommendedSongList from "./modules/RecommendedSongList";
import NewDiscList from "./modules/NewDiscList";
import PlayPauseBtn from "./modules/PlayPauseBtn";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    RecommendedSongList,
    NewDiscList,
    PlayPauseBtn
  }
});
