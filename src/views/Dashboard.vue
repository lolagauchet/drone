<template>
  <div class="dashboard">
    <Drone :droneInfo="droneInfo" 
 />
  </div>
</template>
<script>
import Drone from "@/components/Drone.vue";
import socket from "@/services/socket.js";

export default {
  name: "login",
  mounted(){
    // this.$store.dispatch("getSensors"),
    this.$store.dispatch("getFullState")
  },
  computed: {
    droneInfo(){
      return this.$store.state.sensors;
    }
  },
  components: {
    Drone
  }
};
</script>