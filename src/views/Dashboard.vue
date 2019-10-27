<template>
  <div class="dashboard">
    <div class="left">
      <button v-on:click="mqqtSocket()" class="button is-primary is-light">Mettre à jour les infos du drone</button>
      <div class="sensors">
          <div 
              :key="sensorInfo.id"
              v-for="sensorInfo in droneInfo.value">
              <SensorGPS :sensorInfo="sensorInfo"  v-if="sensorInfo.type === 3336"/>
              <SensorAltitude :sensorInfo="sensorInfo" v-if="sensorInfo.type === 3321" />
              <SensorRate :sensorInfo="sensorInfo" v-if="sensorInfo.type === 3346" />
              <SensorSwitch :sensorInfo="sensorInfo"  v-if="sensorInfo.type === 3342" /> 
          </div>
      </div>
    </div>
   
    <div class="map--wrapper">

      <div
        :key="sensorInfo.type"
          v-for="sensorInfo in droneInfo.value">
        
          <SensorMap  :sensorInfo="sensorInfo" v-if="sensorInfo.type === 3336"/>
      </div>
    </div>
  </div>
</template>
<script>
import Drone from "@/components/Drone.vue";
import Device from "@/components/Device.vue";
import SensorGPS from "@/components/SensorGPS.vue";
import SensorAltitude from "@/components/SensorAltitude.vue";
import SensorSwitch from "@/components/SensorSwitch.vue";
import SensorMap from "@/components/SensorMap.vue";
import SensorRate from "@/components/SensorRate.vue";
import socket from "@/services/socket.js";
import { EventBus } from '@/services/eventBus.js';



export default {
  name: "login",
  
  mounted(){
    // this.$store.dispatch("getSensors"),
    this.$store.dispatch("getFullState");
    var vm = this;
    EventBus.$on('new-received-message', ({topicSplit, message}) => {
      vm.$store.dispatch('updateSensorGlobal', {topicSplit, message});
    });
  },
  computed: {
    droneInfo(){
      return this.$store.state.sensors;
    }
  },
  components: {
    Drone,
    SensorGPS,
    SensorAltitude,
    SensorSwitch,
    SensorMap,
    SensorRate,
    Device
  },
  methods: {
    mqqtSocket() {
      this.$store.dispatch("mqqtSocket");
      this.$store.dispatch("getFullState");
    }
  }
};
</script>
<style lang="scss"> 
  .dashboard{
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px 15px;
  }
  .button{
    margin-bottom: 30px;
  }
  .sensors{
    padding: 0 20px;
    display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 30px 15px;
    >div{
      margin-bottom: 20px;
    }
  }
</style>
