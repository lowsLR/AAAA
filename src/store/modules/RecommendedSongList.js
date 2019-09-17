import * as types from "../mutation-types";
import { reSongList } from "../../api";

export default {
  state: {
    reSong: [],
    reSongNum: "",
    songList: [],
    searchList: [],
    searchImg: []
  },
  getters: {
    rSong(state) {
      return state.reSong;
    },
    songListData(state) {
      return state.songList;
    },
    searchListData(state) {
      return state.searchList;
    },
    searchListImg(state) {
      return state.searchImg;
    }
  },
  mutations: {
    [types.RECOMMENDED_SONG_LIST](state, reSong) {
      state.reSong = reSong;
    },
    changeReSong(state, num) {
      state.reSongNum = num;
      // console.log(state.reSongNum, "reSongNum");
    },
    conduction(state, songList) {
      state.songList = songList;
      // console.log(state.songList, " state.songId");
    },
    footerSearchList(state, searchList) {
      state.searchList = searchList;
      console.log(state.searchList, " state.songId");
    },
    footerSearchImg(state, searchImg) {
      state.searchImg = searchImg;
    }
  },
  actions: {
    getReSongList(state, axios) {
      // console.log(state, "state");
      axios.get(`${reSongList}${state.state.reSongNum}`).then(res => {
        let reSongs = res.data.result;
        // console.log(reSongs, "reSongs");
        state.commit(types.RECOMMENDED_SONG_LIST, reSongs);
      });
    }
  }
};
