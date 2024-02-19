<template>
  <div class="container">
    <h2>{{ getMatch.acf.title }}</h2>
    <p>{{ getMatch.acf.description }}</p>
    <p>Start Date: {{ getMatch.acf.start_date }}</p>
    <p>End Date: {{ getMatch.acf.end_date }}</p>

    <div id="map"></div>
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import {  onMounted, computed } from 'vue'
import * as L from 'leaflet'

const gamesStore = useGamesStore()

gamesStore.getMatch(matchId)

const matchId = 327

const getMatch =  computed(() => {
  return  gamesStore.oneMatch
})


// onMounted(() => {
//   console.log(getMatch)

//   if (getMatch.value.start_point && getMatch.value.start_point.position) {
//     const { latitude, longitude } = getMatch.value.start_point.position

//     // Vérifier si les coordonnées sont valides
//     if (!isNaN(latitude) && !isNaN(longitude)) {
//       // Initialiser une nouvelle carte sans utiliser les props
//       const map = L.map('map', {
//         center: [latitude, longitude],
//         zoom: 15,
//         layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
//       })

//       // Ajouter des marqueurs pour les données stockées une fois que la carte est prête
//       map.whenReady(() => {
//         getMatch.value.markers.forEach((marker) => {
//           const { latitude, longitude } = marker.position
//           const markerIcon = L.icon({
//             iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
//             iconSize: [50, 50],
//             iconAnchor: [12, 41],
//             popupAnchor: [0, -30]
//           })
//           L.marker([latitude, longitude], { icon: markerIcon })
//             .addTo(map)
//             .bindPopup(`<b>${marker.name}</b>`)
//         })

//         // Ajouter un marqueur pour le start_point
//         const startPointIcon = L.icon({
//           iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
//           iconSize: [50, 50],
//           iconAnchor: [12, 41],
//           popupAnchor: [0, -30]
//         })
//         L.marker([latitude, longitude], { icon: startPointIcon })
//           .addTo(map)
//           .bindPopup('<b>Start Point</b>')
//       })
//     }
//   }
// })
</script>




