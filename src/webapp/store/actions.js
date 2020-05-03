import {
  SETCOUNT
} from './mutations-type'
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:3000"
export default {
  increment({
    state,
    commit
  }) {
    commit(SETCOUNT, ++state.count)
  },
  decrement({
    state,
    commit
  }) {
    commit(SETCOUNT, --state.count)
  },
  async getServerData({
    commit
  }) {
    const res = await axios.get("/getdata")
    commit("SERVERDATA", res.data)
  },
  async getServerData2({
    commit
  }) {
    const res = await axios.get("/getdata2")
    commit("SERVERDATA2", res.data)
  }
}