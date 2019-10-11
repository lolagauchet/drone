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
    sensors: [],
    latitude: null,
    longitude: null
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
    setValueSensor(state, {key, value}){
      state[key] = value
    },
    setSensors(state, value){
      state.sensors = value
    },
    updateSensor(state,payload){
      // console.log(payload.value.topicSplit);
      var sensorModified = state.sensors.value.find(function(sensor) {
        return sensor.type == payload.value.topicSplit[2] && sensor.nativeNodeId == payload.value.topicSplit[3] && sensor.nativeSensorId == payload.value.topicSplit[4]
      });
      sensorModified.resources[payload.value.topicSplit[5]] = payload.value.message
    }
    
  },
  actions: {
    checkForm({state, commit}){
      return new Promise((resolve) => {
        axios
          .post(`${process.env.VUE_APP_SERVER_URL}`, {
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
              console.log(response.data);
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
          .get(`${process.env.VUE_APP_HTTP_URL}` + this.state.loginForm.deviceId, {
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
    updateLat({state, commit}){
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

      socket.updateSocket(baseOptions, {
        "ref": "3336",
        "ressourceID": "5514",
        'latitude':state.latitude
      })
    },
    updateLong({state, commit}){
      const baseOptions = {
        protocolId: 'MQTT',
        protocolVersion: 4,
        reconnectPeriod: 3000,
        connectTimeout: 30 * 1000,
        clean: true,
        clientId: this.state.loginForm.devEui,
        username: this.state.loginForm.deviceId,
        password: this.state.loginForm.apiKey,
      };

      socket.updateSocket(baseOptions, {
        "ref": "3336",
        "ressourceID": "5515",
        'longitude':state.longitude
      })
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
    
      socket.initSocket(baseOptions);
      socket.sendFakeData(baseOptions);
      // console.log(readMessage);
              
    },
    updateSensorGlobal(context, {topicSplit, message}){
      // console.log(topicSplit);
      var payload = {"topicSplit":topicSplit,"message": message} 
      // console.log(payload);
      context.commit('updateSensor', {
        key: "topicSplit",
        value: payload
      })
    }
    // getSensors(context){
    //   context.commit("setSensors", droneInfo)
    // }
  }
});
