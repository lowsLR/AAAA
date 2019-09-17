import * as types from "../mutation-types";
import { newDisc } from "../../api";

export default {
  state: {
    newDisc: [],
    nDiscNum: 3
  },
  getters: {
    nDiscList(state) {
      return state.newDisc;
    }
  },
  mutations: {
    [types.NEWDISC_LIST](state, newDisc) {
      state.newDisc = newDisc;
    },
    changenDisc(state, num) {
      state.nDiscNum = num;
      // console.log(state.nDiscNum, "nDiscNum");
    }
  },
  actions: {
    getNewSongList(state, axios) {
      axios.get(`${newDisc}${state.state.nDiscNum}`).then(res => {
        let nDisc = res.data.albums;
        // console.log(nDisc, "nDisc");
        state.commit(types.NEWDISC_LIST, nDisc);
      });
    }
  }
};
