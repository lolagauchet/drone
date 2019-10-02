
<template>

  <div class="wrapper">
    <div class="device">
      <p>{{ device }} </p>
    </div>
    <div class="drones">
      <section class='drone_wrapper'>
      <p> Here are my drones </p>
        <div class='card' v-for="drone in drones">
          <div class='card-content'>
          <p> {{drone.name}}</p>
          <p> lat : {{drone.latitude}}</p>
          <p> long : {{drone.longitude}}</p>
          </div>
        </div>
      </section>

      <div class="map">
        <l-map :zoom="zoom" :center="center">
          <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
          <l-marker 
            v-for="drone in drones"
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
import deviceTree from '@/assets/device.json';
import {LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet';
import droneImg from '@/assets/drone.svg';
export default {
  name: "Device",
  data() {
    return {
      errors: [],
      drones: deviceTree.children,
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
  .drones{
    display:flex;
    justify-content: space-between;
  }
  .drone_wrapper{
    width:50%;
    display:flex;
    flex-wrap:wrap;
    justify-content: space-between;
  }
  .card{
    width: 45%;
    margin:10px;
  }
  input{
    margin-bottom: 20px;
  }
  .map{
    width:50%;
    height:500px;
  }
</style>

