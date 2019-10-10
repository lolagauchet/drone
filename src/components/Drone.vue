
<template>

  <div class="wrapper">
    <div class="drones">
        <div class='card'
          :key="sensorInfo.id"
          v-for="sensorInfo in droneInfo.value"
        >
          <div class='card-content sensor'>
            <p class="has-text-link	sensor--name"> {{sensorInfo.name}}</p>
            <div v-if="sensorInfo.type === 3336">
              <p class="has-text-weight-semibold">Latitude actuelle : {{sensorInfo.resources[5514]}} </p>
              <p class="has-text-weight-semibold">Longitude actuelle : {{sensorInfo.resources[5515]}} </p>
              <div class="separator"></div>
              <div class="new_lat">
                <p>Nouvelle latitude</p>
                <input class="input is-primary is-small" type="number" name="quantity" min="1" max="5">
              </div>
              <div class="new_long">
                <p>Nouvelle longitude</p>
                <input class="input is-primary is-small" type="number" name="quantity" min="1" max="5">
              </div>
            </div>
            <div v-if="sensorInfo.type === 3342">
              <div class="button is-primary">ON</div>
              <div class="button is-danger is-outlined">OFF</div>
            </div>
            <div v-if="sensorInfo.type === 3321">
              <p class="has-text-weight-semibold">Altitude actuelle : {{sensorInfo.resources[5514]}} m </p>
              <div class="separator"></div>
              <div class="new_lat">
                <p>Nouvelle altitude</p>
                <input class="input is-primary is-small" type="number" name="quantity" min="1" max="5">
              </div>
            </div>
          </div>
      </div>
    </div>
    
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
      center: L.latLng(0.0, 0.0),
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: L.latLng(0.0, 0.0),
      icon: droneImg,
      iconSize: [25,25]
    };
  },
  // mounted () {
  //     this.$nextTick(() => {
  //       this.$refs.myMap.mapObject.L.Routing.control({
  //         waypoints: [
  //           L.latLng(57.74, 11.94),
  //           L.latLng(57.6792, 11.949)
  //         ]
  //       }).addTo(map);
  //     })
  //   },
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
  .new{
    &_lat, &_long{
      display: grid;
       grid-template-columns: 2fr 1fr;
    }
  }
  input{
    margin-bottom: 20px;
  }
  .map{
    height:500px;
  }
  .sensor{
    position: relative;
    &--name{
      background-color: #fff;
      padding: 10px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
</style>

