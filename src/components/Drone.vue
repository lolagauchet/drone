
<template>

  <div class="wrapper">
    <div class="device">
      <p>{{ device }} </p>
    </div>
    <div class="drones">
      <section class='drone_wrapper'>
        <div class='card'
        >
          <div class='card-content'>
            <p class="has-text-weight-bold name"> {{drone.name}}</p>
            <p> Lat : {{drone.latitude}}</p>
            <p> Long : {{drone.longitude}}</p>

        <div
          class="sensor"
          :key="droneSensor"
          v-for="droneSensor in droneSensors"
        >
        
          <p class="has-text-link	"> {{droneSensor.name}}</p>
          <p v-if="droneSensor.vitesse"> Vitesse actuelle : {{droneSensor.vitesse}} km/h</p>
          <p v-if="droneSensor.vitesseMax"> Vitesse max : {{droneSensor.vitesse}} km/h</p>
          <p v-if="droneSensor.altitude"> Altitude actuelle : {{droneSensor.altitude}} m</p>
          <p v-if="droneSensor.altitudeMax"> Altitude max : {{droneSensor.altitude}}m</p>

        </div>
          </div>
        </div>
        
      </section>

      <div class="map">
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker 
            :lat-lng="latLng(drone.latitude, drone.longitude)"
          >
            <l-icon
              :icon-size="iconSize"
              :icon-url="icon"
            ></l-icon>
          </l-marker>
        </l-map>
      </div>
    </div>
  </div>

  
</template>

<script>
import { mapGetters } from 'vuex';
import droneInfos from '@/assets/drone.json';
import {LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import droneImg from '@/assets/drone.svg';
export default {
  name: "Device",
  data() {
    return {
      errors: [],
      drone: droneInfos,
      droneSensors: droneInfos.children,
      zoom:13,
      center: L.latLng(47.413220, -1.219482),
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(47.413220, -1.219482),
      icon: droneImg,
      iconSize: [25,25]
    };
  },
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon
  },
  methods: {
    latLng: function(lat, lng) {
      return L.latLng(lat, lng);
    }
  },
  computed: {
        ...mapGetters({
          device : 'device',
      }),
      updatedSensor: {
        get() {
          return this.drone;
          return this.droneSensors;
        },
        set(value) {
          this.drone = value;
          this.droneSensors = value;
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
  .wrapper{
    width: 70%;
    margin: auto;
  }
  .drones{
    display:flex;
    justify-content: space-between;
  }
  .drone_wrapper{
    width:30%;
  }
  .card{
    margin:10px;
    margin-top: 0;
    &-content {
      text-align: left;
      .name{
        margin-bottom: 20px;
      }
    }
  }
  input{
    margin-bottom: 20px;
  }
  .map{
    width:70%;
    height:500px;
  }
  .sensor{
    margin-top: 20px;
  }
</style>

