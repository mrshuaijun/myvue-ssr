import {
  SETCOUNT
} from './mutations-type'
export default {
  [SETCOUNT](state, count) {
    console.log(count)
    state.count = count
  },
  SERVERDATA(state, data) {
    state.serverData = data
  },
  SERVERDATA2(state, data) {
    state.serverData2 = data
  }
}