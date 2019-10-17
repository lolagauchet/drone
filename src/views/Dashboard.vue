<template>
  <div class="dashboard">
    <div class="sensors">

        <Device />
        <div 
            :key="sensorInfo.id"
            v-for="sensorInfo in droneInfo.value">
        
            <SensorGPS :sensorInfo="sensorInfo"  v-if="sensorInfo.type === 3336"/>
            <SensorAltitude :sensorInfo="sensorInfo" v-if="sensorInfo.type === 3321" />
            <SensorSwitch :sensorInfo="sensorInfo"  v-if="sensorInfo.type === 3342" /> 
        
          <!--  <SensorDistance :sensorInfo="sensorInfo"  v-if="sensorInfo.type === 3330" /> -->
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
import SensorDistance from "@/components/SensorDistance.vue";
import SensorMap from "@/components/SensorMap.vue";
import socket from "@/services/socket.js";
import { EventBus } from '@/services/eventBus.js';



export default {
  name: "login",
  
  mounted(){
    // this.$store.dispatch("getSensors"),
    this.$store.dispatch("getFullState");
    var vm = this;
    EventBus.$on('new-received-message', ({topicSplit, message}) => {
      // console.log('in event bus');
      // console.log(topicSplit);
      vm.$store.dispatch('updateSensorGlobal', {topicSplit, message});
    });
  },
  computed: {
    droneInfo(){
      return this.$store.state.sensors;
      console.log(this.$store.state.sensors);
    }
  },
  components: {
    Drone,
    SensorGPS,
    SensorAltitude,
    SensorSwitch,
    SensorDistance,
    SensorMap,
    Device
  }
};
</script>
<style lang="scss"> 
  .dashboard{
    // display: flex;
    // grid-template-columns: 1fr 1fr 1fr;
    // grid-gap: 30px 15px;
    width: 70%;
    margin: auto;
  }
  .map{
    width: 100%;
  }
</style>
