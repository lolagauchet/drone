import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
// import droneInfo from '@/assets/drone.json';
import socket from '@/services/socket.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginForm: {
      devEui: null,
      deviceId: null,
      apiKey: null,
      device: null,
    },
    sensors: []
  },
  getters: {
    device: state => {
      return state.loginForm.device
    },
    sensors: state => {
      return state.sensors
    },
  },
  mutations: {
    setValue(state, {key, value}){
      state.loginForm[key] = value
    },
    setSensors(state, value){
      state.sensors = value
    }
    
  },
  actions: {
    checkForm({state, commit}){
      return new Promise((resolve) => {
        axios
          .post('https://aloes.io/app/api/Devices/authenticate', {
            deviceId: state.loginForm.deviceId,
            apiKey: state.loginForm.apiKey
          })
          .then(response => {
            if (response.data && response.data.device) {
              commit('setValue', {
                key: "device",
                value: response.data.device
              }),
              commit('setValue', {
                key: "devEui",
                value: response.data.device.devEui
              })
              console.log(response.data.device);
            
              resolve(true);
              return response.data.device
            }
            return 'device not authenticate'
          })
          .catch(error => {
            console.log('error', error)
          }
        )
      })
      // .then(res => res.json())
    },
    getFullState({state, commit}){
        axios
          .get('https://aloes.io/app/api/Devices/get-full-state/' + this.state.loginForm.deviceId, {
            headers:{
              devEui: state.loginForm.devEui,
              apiKey: state.loginForm.apiKey
            }
          })
          .then(response => {
            // console.log(response);
            if (response.data && response.data.sensors) {
              commit('setSensors', {
                key: "sensors",
                value: response.data.sensors
              })
              // console.log(response.data.sensors);
              return response.data.sensors
            }
            return 'sensors not found'
          })
          .catch(error => {
            console.log('error', error)
          }
      )
    },
    mqqtSocket(){
      const baseOptions = {
        //  keepalive: 60,
        // reschedulePings: true,
        protocolId: 'MQTT',
        protocolVersion: 4,
        reconnectPeriod: 3000,
        connectTimeout: 30 * 1000,
        clean: true,
        clientId: this.state.loginForm.devEui,
        username: this.state.loginForm.deviceId,
        password: this.state.loginForm.apiKey,
      };

      socket.initSocket(baseOptions)
              
    },
    // getSensors(context){
    //   context.commit("setSensors", droneInfo)
    // }
  }
});
