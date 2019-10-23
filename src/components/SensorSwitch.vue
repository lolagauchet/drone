
<template>
    <div class="card"> 
        <div class='card-content sensor'>
            <div class="sensor--header">
            <img :src="`https://aloes.io/${sensorInfo.icons[0]}`" :alt="`{{sensorInfo.name}}`" class="sensor--icon"/>
            <p class="sensor--name has-text-dark">{{sensorInfo.name}}</p>
            </div>
            <div v-if="sensorInfo.resources[5500] == 0" class="drone_wrapper">
                <p>Eteint</p>
                <div class="button is-primary is-outlined ">ON</div>
                <div class="button is-danger">OFF</div>
                 <img :src="icon" class="drone_icon"/>
            </div>
            <div v-if="sensorInfo.resources[5500] == 1"  class="drone_wrapper">
                <p>Allumé</p>
                <div class="button is-primary">ON</div>
                <div class="button is-danger is-outlined">OFF</div>
                 <img :src="icon" class="drone_icon drone_icon--active"/>
            </div>
        </div> 
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import droneImg from '@/assets/drone.svg';
export default {
    data() {
        return {
            errors: [],
            icon: droneImg
        };
    },
    props: [
        "sensorInfo"
    ],
    computed: {  
        ...mapGetters({
            device : 'device',
        })
    }
};
</script>

<style lang="scss"> 
  .drone_icon{
    width: 30px;
    height: auto;
    position: absolute;
    right: 20px;
    &--active{
      animation: bounce 1.5s ease infinite alternate;
    }
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

