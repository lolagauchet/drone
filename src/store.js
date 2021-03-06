import Vue from "vue";
import Vuex from "vuex";
import axios from 'axios';
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
    longitude: null,
    altitude: null,
    rate: null,
    off: "false",
    on: "true",
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
    //mise à jour des valeur des sensor dans le state
    setValueSensor(state, {key, value}){
      state[key] = value
    },
    setSensors(state, value){
      state.sensors = value
    },
    // mise à jour du sensor lors de la reception d'une nouvelle donnée
    updateSensor(state,payload){
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
    //récupération des valeurs des sensors
    getFullState({state, commit}){
        axios
          .get(`${process.env.VUE_APP_HTTP_URL}` + this.state.loginForm.deviceId, {
            headers:{
              devEui: state.loginForm.devEui,
              apiKey: state.loginForm.apiKey
            }
          })
          .then(response => {
            if (response.data && response.data.sensors) {
              commit('setSensors', {
                key: "sensors",
                value: response.data.sensors
              })
              return response.data.sensors
            }
            return 'sensors not found'
          })
          .catch(error => {
            console.log('error', error)
          }
      )
    },
    // mise à jour de la valeur de la latitude 
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
    // mise à jour de la valeur de l'altitude 
    updateAlt({state, commit}){
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

      socket.updateAlt(baseOptions, {
        "ref": "3321",
        "ressourceID": "5601",
        'altitude':state.altitude
      })
    },
    // mise à jour de la valeur de la vitesse 
    updateRate({state, commit}){
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

      socket.updateRate(baseOptions, {
        "ref": "3346",
        "ressourceID": "5700",
        'rate':state.rate
      })
    },
    // mise à jour de la valeur de la longitude 
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

      socket.updateLong(baseOptions, {
        "ref": "3336",
        "ressourceID": "5515",
        'longitude':state.longitude
      })
    },
    // switch off
    switchOff({state, commit}){
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

      socket.switchOff(baseOptions, {
        "ref": "3342",
        "ressourceID": "5500",
        'off':state.off
      })
    },
    // switch on
    switchOn({state, commit}){
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

      socket.switchOn(baseOptions, {
        "ref": "3342",
        "ressourceID": "5500",
        'on':state.on
      })
    },
    //connexion mqqt
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
    // mise à jour des valeurs d'un sensor lors de la reception de nouvelles données
    updateSensorGlobal(context, {topicSplit, message}){
      var payload = {"topicSplit":topicSplit,"message": message} 
      context.commit('updateSensor', {
        key: "topicSplit",
        value: payload
      })
    }
  }
});
