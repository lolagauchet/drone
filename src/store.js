import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginForm: {
      deviceId: null,
      apiKey: null,
      device: null
    }
  },
  getters: {
    device: state => {
      return state.loginForm.device
    }
  },
  mutations: {
    setValue(state, {key, value}){
      state.loginForm[key] = value
    }
  },
  actions: {
    checkForm({state, commit}){

    axios
      .post('http://10.28.72.221:8000/api/Devices/authenticate', {
        deviceId: state.loginForm.deviceId,
        apiKey: state.loginForm.apiKey
      })
      .then(response => {
        if (response.data && response.data.device) {
          commit('setValue', {
            key: "device",
            value: response.data.device
          })
          console.log(response.data.device);
          return response.data.device
        }
        return 'device not authenticate'
      })
      .catch(error => {
        console.log('error', error)
      })
    // .then(res => res.json())
    }
  }
});
