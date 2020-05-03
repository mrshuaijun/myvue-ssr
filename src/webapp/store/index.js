import Vue from 'vue'
import Vuex from 'vuex'
import defaultState from './state'
import mutations from './mutations'
import actions from './actions'

// 判断当前开发环境

const isBrowser = typeof window !== "undefined"

//if (!isBrowser || process.env.NODE_ENV === "development") {
Vue.use(Vuex)
//}

const state = (isBrowser && window.__INITIAL_STATE__) || defaultState

export function createStore() {

  return new Vuex.Store({
    state,
    mutations,
    actions
  })
}