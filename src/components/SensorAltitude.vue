
<template>
    <div class="card">
        <div class='card-content sensor'>
            <div class="sensor--header">
            <img :src="`https://aloes.io/${sensorInfo.icons[0]}`" :alt="`{{sensorInfo.name}}`" class="sensor--icon"/>
            <p class="sensor--name has-text-dark">{{sensorInfo.name}}</p>
            </div>
            <!-- long / lat -->
            <p class="has-text-weight-semibold">Altitude actuelle : {{sensorInfo.resources[5601]}} {{sensorInfo.resources[5701]}} </p>
            <div class="separator"></div>
              <p v-if="sensorInfo.resources[5601] < 10"><span class="has-text-weight-semibold">Etat : </span> l'arret</p>
              <p v-if="sensorInfo.resources[5601] >= 10"><span class="has-text-weight-semibold">Etat : </span>En mouvement</p>
            <div class="separator"></div>
            <div class="new_info">
                <p>Nouvelle altitude</p>
                <input v-model="altitude" class="input is-primary is-small" type="text" name="quantity" >
                <div v-on:click="updateAlt()" class="button is-small">valider</div>
            </div>         
        </div>
    </div>
  
</template>

<script>
import { mapGetters } from 'vuex';
// import droneInfos from '@/assets/drone.json';
export default {
  name: "Altitude",
  data() {
    return {
      errors: []
    };
  },
  props: [
    "sensorInfo"
  ],
  methods: {
    updateAlt() {
      this.$store.dispatch("updateAlt")
    }
  },
   computed: {  
    ...mapGetters({
        device : 'device',
    }),
    altitude: {
      get() {
        return this.$store.state.altitude;
      },
      set(value) {
        this.$store.commit('setValueSensor', {
          key: 'altitude',
          value,
        });
      },
    }
  },

};
</script>

<style lang="scss"> 
  .drones{
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 30px 15px;
    width: 70%;
    margin: auto;
    margin-bottom: 40px;
  }
  .card{
    height: 100%;
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

