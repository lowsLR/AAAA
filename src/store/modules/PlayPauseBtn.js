export default {
  state: {
    flas: true
  },
  getters: {
    playPause(state) {
      return state.flas;
    }
  },
  mutations: {
    passFlas(state, flas) {
      state.flas = flas;
      console.log(state.flas, "flas");
    }
  },
  actions: {}
};
