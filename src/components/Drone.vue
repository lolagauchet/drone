
<template>

  <div class="wrapper">
    
    <!-- drones informations -->
    <div class="drones">
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
      <div class='card'
        :key="sensorInfo.id"
        v-for="sensorInfo in droneInfo.value"
      >
        <div class='card-content sensor'>
          <div class="sensor--header">
            <img :src="`https://aloes.io/${sensorInfo.icons[0]}`" :alt="`{{sensorInfo.name}}`" class="sensor--icon"/>
            <p class="sensor--name has-text-dark">{{sensorInfo.name}}</p>
          </div>
          <!-- long / lat -->
          <div v-if="sensorInfo.type === 3336">
            <p class="has-text-weight-semibold">Latitude actuelle : {{sensorInfo.resources[5514]}} </p>
            <p class="has-text-weight-semibold">Longitude actuelle : {{sensorInfo.resources[5515]}} </p>
            <div class="separator"></div>
            <div class="new_info">
              <p>Nouvelle latitude</p>
              <input v-model="latitude" class="input is-primary is-small" type="text" name="quantity" >
              <div v-on:click="updateLat()" class="button is-small">valider</div>
            </div>
            <div class="new_info">
              <p>Nouvelle longitude</p>
              <input  v-model="longitude" class="input is-primary is-small" type="text">
              <div v-on:click="updateLong()" class="button is-small">valider</div>
            </div>
          </div>

          <!-- ON / OFF -->
          <div v-if="sensorInfo.type === 3342">
            <div class="button is-primary">ON</div>
            <div class="button is-danger is-outlined">OFF</div>
          </div>

          <!-- ALTITUDE -->
          <div v-if="sensorInfo.type === 3321">
            <p class="has-text-weight-semibold">Altitude actuelle : {{sensorInfo.resources[5601]}} {{sensorInfo.resources[5701]}} </p>
            <div class="separator"></div>
            <div class="new_info">
              <p>Nouvelle altitude</p>
              <input class="input is-primary is-small" type="text">
              <div class="button is-small">valider</div>
            </div>
          </div>

          <!-- DISTANCE -->
          <div v-if="sensorInfo.type === 3330">
              <p class="has-text-weight-semibold">Distance actuelle : {{sensorInfo.resources[5601]}} {{sensorInfo.resources[5701]}} </p>
          </div>

          <!-- VITESSE -->
          <div v-if="sensorInfo.type === 3346">
              <p class="has-text-weight-semibold">Vitesse actuelle : {{sensorInfo.resources[5601]}} {{sensorInfo.resources[5701]}} </p>
          </div>

          
        </div>
      </div>
    </div>
    
    <!-- map -->
      <div class="map">
        <l-map :zoom="zoom" :center="center" ref="myMap">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker   
                :lat-lng="marker"
              >
                <l-icon
                  :icon-size="iconSize"
                  :icon-url="icon"
                ></l-icon>
              </l-marker>
        </l-map>
      </div>
  </div>

  
</template>

<script>
import { mapGetters } from 'vuex';
// import droneInfos from '@/assets/drone.json';
import {LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import droneImg from '@/assets/drone.svg';
export default {
  name: "Drone",
  data() {
    return {
      errors: [],
      zoom:13,
      center: L.latLng(47.2382007, -1.6300958),
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.2382007, -1.6300958),
      icon: droneImg,
      iconSize: [25,25]
    };
  },
  props: [
    "droneInfo"
  ],
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
  },
  methods: {
    // latLng: function(lat, lng) {
    //   return L.latLng("lat, lng");
    // },
    updateLat() {
      this.$store.dispatch("updateLat")
    },
    updateLong() {
      this.$store.dispatch("updateLong")
    }
  },
   computed: {  
    ...mapGetters({
        device : 'device',
    }),
    latitude: {
      get() {
        return this.$store.state.latitude;
      },
      set(value) {
        this.$store.commit('setValueSensor', {
          key: 'latitude',
          value,
        });
      },
    },
    longitude: {
      get() {
        return this.$store.state.longitude;
      },
      set(value) {
        this.$store.commit('setValueSensor', {
          key: 'longitude',
          value,
        });
      },
    }
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

