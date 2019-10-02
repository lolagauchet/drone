
<template>
  <div class="device">
  
    <p>{{ device }} </p>
    <p> Here are my sensors </p>
      <li v-for="drone in drones">
       {{drone.name}}
      </li>
    
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import deviceTree from '@/assets/device.json';
export default {
  name: "Device",

  data() {
    return {
       errors: [],
       drones: deviceTree.children,
    };
  },

    computed: {
         ...mapGetters({
            device : 'device',
        }),
        updatedSensor: {
          get() {
            return this.drones;
          },
          set(value) {
            this.drones = value;
          },
        },
    },

};
</script>

<style lang="scss"> 
  #login_form {
  max-width: 30%;
  margin: auto;
  }
  input{
    margin-bottom: 20px;
  }
</style>

