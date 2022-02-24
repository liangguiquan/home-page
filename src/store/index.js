import Vue from 'vue'
import Vuex from 'vuex'

import webApps from './webApps'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    webApps,
  },
  strict: true,
})

export default store;