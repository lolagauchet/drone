
<template>


    <!-- map -->
    <div class="map">
        <l-map :zoom="zoom" :center="marker" ref="myMap">
            <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
                <l-marker   
                :lat-lng="marker"
                >
                <l-icon
                    :icon-size="iconSize"
                    :icon-url="icon"
                ></l-icon>
                </l-marker>
                <!-- <l-polyline
                  :lat-lng="this.state.latlong"
                  :color="polyline.color">
                </l-polyline> -->
                            
        </l-map>
    </div>

  
</template>

<script>
import { mapGetters } from 'vuex';
import {LMap, LTileLayer, LMarker, LIcon, LPolyline } from 'vue2-leaflet';
import droneImg from '@/assets/drone.svg';
export default {
  data() {
    return {
      errors: [],
      zoom:8,
      url:'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      icon: droneImg,
      iconSize: [25,25],
      polyline: {
        latlngs: [this.sensorInfo.resources[5514], this.sensorInfo.resources[5515]],
        color: 'green'
      }
    };
  },
  props: [
    "sensorInfo"
  ],
  components: {
      LMap,
      LTileLayer,
      LMarker,
      LIcon,
      LPolyline
  },
  // methods: {
  //   latLng: function(lat, lng) {
  //     return L.latLng("lat, lng");
  //   },
  // },
  computed: {
    marker: function(){
        return  L.latLng(this.sensorInfo.resources[5514],this.sensorInfo.resources[5515]);
    },
    poli: function() {
      return L.polyline(L.latLng(this.sensorInfo.resources[5514],this.sensorInfo.resources[5515]), {color: 'red'});
    }
  }

};
</script>

<style lang="scss"> 
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

