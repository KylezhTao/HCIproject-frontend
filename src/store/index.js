import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userToken: JSON.parse(localStorage.getItem("userToken")) || {},
    userInfo: {},
  },
  mutations: {
    setuserToken(state, v){
      localStorage.setItem('userToken', JSON.stringify(v));//将传递的数据先保存到localStorage中
      state.userToken = v;// 之后才是修改state中的状态
    },
    setuserInfo(state, v){
      state.userInfo = v;
    }
  },
  actions: {

  },
  modules: {
    
  }
});
