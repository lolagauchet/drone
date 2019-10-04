
<template>

  <div class="wrapper">
    <div class="drones">
      <section class='drone_wrapper'>
        <div class='card'
        >
          <div class='card-content'>
            <p class="has-text-weight-bold name">{{droneInfo.name}}</p>
        <div
          class="sensor"
          :key="sensorInfo.id"
          v-for="sensorInfo in droneInfo.value"
        >     
          <p class="has-text-link	"> {{sensorInfo.name}}</p>
          <div v-if="sensorInfo.type === 3336">
            <p>Latitude : {{sensorInfo.resources[5514]}} </p>
            <p>Longitude : {{sensorInfo.resources[5515]}} </p>
          </div>
        </div>
          </div>
        </div>
        
      </section>
      <div class="map">
        <l-map :zoom="zoom" :center="center">
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
      center: L.latLng(0.0, 0.0),
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(0.0, 0.0),
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
  },
   computed: {  
      ...mapGetters({
          device : 'device',
      })
      // dronePos(){
      //   return L.latLng(this.droneInfos.children[0].latitude, this.droneInfos.children[1].longitude )
      // }
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

