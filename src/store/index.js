import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    nm: window.localStorage.getItem("nowNm")||  "北京",
    id: window.localStorage.getItem("nowId")|| 1
  },
  mutations: {
        CityInfo(state,playload){
          state.nm=playload.nm
          state.id=playload.id
        }
  },
  actions: {
  },
  modules: {
  },
});
