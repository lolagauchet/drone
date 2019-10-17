
<template>
    <!-- drones informations -->
      <div class="card">
        <div class='card-content'>   
          <div class="sensor--header">
              <img :src="icon" class="sensor--icon"/>
               <p class="has-text-darksensor--name">Drone infos</p>
            </div>
         
          <p class="has-text-weight-semibold">{{device.name}}</p>
          <p>{{device.description}}</p>
        </div>
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
import droneImg from '@/assets/drone.svg';
export default {
  name: "Device",
  data() {
    return {
      errors: [],
      icon: droneImg
    };
  },
   computed: {  
    ...mapGetters({
        device : 'device',
    })
  },

};
</script>

<style lang="scss"> 
  #login_form {
  max-width: 30%;
  margin: auto;
  }
  .drones{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px 15px;
    width: 70%;
    margin: auto;
    margin-bottom: 40px;
  }
  .card{
    margin-top: 0;
    &-content {
      text-align: left;
      height: 100%;
      .name{
        margin-bottom: 20px;
      }
    }
  }
  .separator{
    height: 2px;
    background-color: #f3f3f3;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .new_info{
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    grid-gap: 5px;
  }
  input{
    margin-bottom: 20px;
  }
  .map{
    height:500px;
  }
  .sensor{
    position: relative;
    &--icon{
      width: 20px;
      height: auto;
      margin-right: 10px;
    }
    &--header{
      background-color: #fff;
      padding: 10px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
      display: flex;
      align-items: center;
    }
  }
</style>

