import Vue from 'vue'
import Vuex from 'vuex'
//import * as actions from './actions'
//import * as getters from './getters'

Vue.use(Vuex)

const state = {
  count: 10,
  openTabs: [],//所有打开当路由
  activeIndex: '/index'
}

const mutations = {
  INCREMENT(state){
    state.count++;
  },
  DECREMENT(state){
    state.count--;
  },
  add_tab(state, data){
    this.state.openTabs.push(data);
  },
  remove_tab(state, route){
    let index = 0;
    for(let option of state.openTabs){
      if(option.route === route){
        break;
      }
      index++;
    }
    this.state.openTabs.splice(index, 1);
  },
  set_active_index(state, index){
    this.state.activeIndex = index;
  }
}

const store = new Vuex.Store({
  state,
  //actions,
  // getters,
  mutations
});

export default store;
