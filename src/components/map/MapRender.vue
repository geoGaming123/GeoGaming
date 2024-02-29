<template>
  <h2>{{ match.acf.title }}</h2>
  <p>{{ match.acf.description }}</p>
  <p>Start Date: {{ match.acf.start_date }}</p>
  <p>End Date: {{ match.acf.end_date }}</p>
  <p>balise: {{ match.acf.markers.length }}</p>
  <div v-if="match.acf.players.length > 1">
  <p>players: {{ match.acf.players.length }}</p>
</div>
<div v-else>
  <p>players: 0</p>
</div>



  <div id="map"></div>

  <div v-if="props.timer">
    <Timer :updateShowMarkers="updateShowMarkers"></Timer>
  </div>

  <div v-if="props.delete">
    <ButtonDelete :id="matchId"></ButtonDelete>
  </div>

  <div v-if="props.join">
    <ButtonJoin :id="matchId"></ButtonJoin>
  </div>

  <div v-if="props.leave">
    <ButtonLeaveGame :id="matchId"></ButtonLeaveGame>
  </div>

  <ButtonModified :id="matchId"></ButtonModified>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { onMounted, computed, ref, watch } from 'vue'
import * as L from 'leaflet'
import ButtonDelete from '@/components/map/ButtonDelete.vue'
import ButtonJoin from './ButtonJoin.vue'
import ButtonModified from './ButtonModified.vue'
import ButtonLeaveGame from './ButtonLeaveGame.vue'
import Timer from '@/components/map/Timer.vue'
import { userposition } from './Userposition.vue'

const gamesStore = useGamesStore()
const props = defineProps([
  'id',
  'delete',
  'join',
  'leave',
  'startpoint',
  'position',
  'markers',
  'timer'
])
const showMarkers = ref(false)
const matchId = props.id
function updateShowMarkers(value) {
  showMarkers.value = value
}

gamesStore.getMatch(matchId)

const match = ref(
  computed(() => {
    return gamesStore.oneMatch
  })
)
console.log(props.startpoint)
onMounted(() => {
  const startPoint = match.value.acf.start_point
  const markers = match.value.acf.markers

  const latitude = startPoint.position.latitude
  const longitude = startPoint.position.longitude

  const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })
console.log('test' + props.markers)
  map.whenReady(() => {
    if(props.markers){
  
        // Afficher les marqueurs sur la carte
        markers.forEach((marker) => {
          const { latitude, longitude } = marker.position
          const markerIcon = L.icon({
            iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
            iconSize: [50, 50],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
          })
          const leafletMarker = L.marker([latitude, longitude], { icon: markerIcon }).bindPopup(
            `<b>${marker.name}</b>`
          )

          marker.leafletMarker = leafletMarker.addTo(map)
        })
        
      } 

    
    watch(showMarkers, (newValue) => {
      if (newValue || props.markers) {
        // Afficher les marqueurs sur la carte
        markers.forEach((marker) => {
          const { latitude, longitude } = marker.position
          const markerIcon = L.icon({
            iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
            iconSize: [50, 50],
            iconAnchor: [12, 41],
            popupAnchor: [0, -30]
          })
          const leafletMarker = L.marker([latitude, longitude], { icon: markerIcon }).bindPopup(
            `<b>${marker.name}</b>`
          )

          marker.leafletMarker = leafletMarker.addTo(map)
        })
      } else {
        // Masquer les marqueurs de la carte
        markers.forEach((marker) => {
          map.removeLayer(marker.leafletMarker)
        })
      }
    })



    if (props.startpoint) {
      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
      })
      L.marker([latitude, longitude], { icon: startPointIcon })
        .addTo(map)
        .bindPopup('<b>Start Point</b>')
    }

    if (props.position) {
      userposition(map)
    }
  })
})
</script>
