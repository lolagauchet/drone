
<template>
    <div class="card"> 
        <div class='card-content sensor'>
            <div class="sensor--header">
              <img :src="icon" class="sensor--icon"/>
              <p class="sensor--name has-text-dark">Drone infos</p>
            </div>
            <div class="infos">  
              <p>{{device.name}}</p>
              <p>{{device.description}}</p>
              <p>{{device.status}}</p>
            </div>
            <div class="separator"></div>
            <div class="switch--header">
              <img :src="`https://aloes.io/${sensorInfo.icons[0]}`" :alt="`{{sensorInfo.name}}`" class="sensor--icon" />
              <p class="sensor--name has-text-dark">{{sensorInfo.name}}</p>
            </div>
            <div v-if="sensorInfo.resources[5500] == 0" class="drone_wrapper">
                <p>Eteint</p>
                <!-- <div class="button is-primary is-outlined"  v-on:click="switchOn()">ON</div>
                <div class="button is-danger">OFF</div> -->
                <img :src="off"  v-on:click="switchOn()" class="switch_icon"/>
                <img :src="icon" class="drone_icon" />
            </div>
            <div v-if="sensorInfo.resources[5500] == 1"  class="drone_wrapper">
                <p>Allumé</p>
                <!-- <div class="button is-primary">ON</div>
                <div class="button is-danger is-outlined"  v-on:click="switchOff()">OFF</div> -->
                <img :src="on"  v-on:click="switchOff()" class="switch_icon"/>
                <img :src="icon" class="drone_icon drone_icon--active"/>
            </div>
        </div> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import droneImg from '@/assets/drone.svg';
import offImg from '@/assets/switchOff.svg';
import onImg from '@/assets/switchOn.svg';
export default {
    data() {
        return {
            errors: [],
            icon: droneImg,
            on: onImg,
            off: offImg,
        };
    },
    props: [
        "sensorInfo"
    ], 
    methods: {
      switchOff() {
        this.$store.dispatch("switchOff")
      },
      switchOn() {
        this.$store.dispatch("switchOn")
      }
    },
    computed: {  
      ...mapGetters({
          device : 'device',
      })
    }
};
</script>

<style lang="scss"> 
  .card{
    height: 100%;
  }
  .drone_icon{
    width: 30px;
    height: auto;
    position: absolute;
    right: 20px;
    &--active{
      animation: bounce 1.5s ease infinite alternate;
    }
  }
  .switch_icon{
    width: 30px;
    height: auto;
    cursor: pointer;
  }
  .separator{
    height: 2px;
    background-color: #f3f3f3;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .is-danger {
    margin-left: 5px;
  }

  @keyframes bounce{
      from {top: 10px;}
      to   {top: 30px;}
  }
  .drone_wrapper{
    position: relative;
  }
  .switch--header{
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
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

