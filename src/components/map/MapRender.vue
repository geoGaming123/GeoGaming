<template>
  <div class="container">
    <h2>{{ match.acf.title }}</h2>
    <p>{{ match.acf.description }}</p>
    <p>Start Date: {{ match.acf.start_date }}</p>
    <p>End Date: {{ match.acf.end_date }}</p>

    <div id="map"></div>
    <MapAddMarkers :map="map" v-bind:match="match" :button="false"></MapAddMarkers>
    <Timer></Timer>
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { onMounted, computed, ref } from 'vue'
import * as L from 'leaflet'
import Timer from '@/components/map/Timer.vue'
import MapAddMarkers from './MapAddMarkers.vue'
// import { userposition } from './Userposition.vue';

const gamesStore = useGamesStore()
const matchId = 335

gamesStore.getMatch(matchId)

const match = ref(computed(() => {
  return gamesStore.oneMatch
}))
 onMounted(()=> {
  
 })

setTimeout(() => {
  const startPoint = match.value.acf.start_point;
    const markers = match.value.acf.markers;
  
      const latitude = startPoint.position.latitude;
      const longitude = startPoint.position.longitude;

      const map = L.map('map', {
        center: [latitude, longitude],
        zoom: 15,
        layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
      });

      map.whenReady(() => {
        markers.forEach((marker) => {
          const { latitude, longitude } = marker.position;
          const markerIcon = L.icon({
            iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
            iconSize: [50, 50],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30],
          });
          L.marker([latitude, longitude], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`<b>${marker.name}</b>`);
        });

        const startPointIcon = L.icon({
          iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
          iconSize: [50, 50],
          iconAnchor: [12, 41],
          popupAnchor: [0, -30],
        });

        L.marker([latitude, longitude], { icon: startPointIcon })
          .addTo(map)
          .bindPopup('<b>Start Point</b>');
      });
},1000)

    
  

</script>




