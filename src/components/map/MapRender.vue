<template>
  <HeaderComp></HeaderComp>
  <div class="game">
  <h2>{{ match.acf.title }}</h2>
  <div class="game-info">
    <p class="game-info-desc">{{ match.acf.description }}</p>
    <div v-if="master" class="game-info-master">
    <p class="game-info-start">Début :<br><span class="game-info-date"></span>{{ startDate }}<br>{{ startTime }}</p>
    <p class="game-info-end">Fin :<br><span class="game-info-date">{{ endDate }}<br>{{ endTime }}</span></p>
    </div>
    <p class="game-info-players">
      <span v-if="match.acf.players.length > 0">{{ match.acf.players.length }}</span>
      <span v-else>0</span>
       joueur(s)</p>
    <p class="game-info-balises">{{ match.acf.markers.length }} balise(s)</p>
  </div>
  
  <div class="game-map" id="map"></div>
  
  <div class="game-btns">
    <Timer v-if="props.timer" :updateShowMarkers="updateShowMarkers"></Timer>
    <ButtonJoin v-if="props.join" class="green" :id="matchId"></ButtonJoin>
    <ButtonLeaveGame v-if="props.leave" class="red"  :id="matchId"></ButtonLeaveGame>
    <ButtonModified v-if="props.modified" class="orange" :id="matchId"></ButtonModified>
    <ButtonDelete  v-if="props.delete" class="red" :id="matchId"></ButtonDelete>
  </div>
</div>
  
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
import HeaderComp from '../HeaderComp.vue'

const gamesStore = useGamesStore()
const props = defineProps([
  'id',
  'delete',
  'join',
  'leave',
  'startpoint',
  'position',
  'markers',
  'timer',
  'modified',
  'master',
])

const showMarkers = ref(false)
const matchId = props.id
function updateShowMarkers(value) {
  showMarkers.value = value
}

gamesStore.getMatch(matchId)

const match = computed(() => {
    return gamesStore.oneMatch
  })


let [startDate, startTime] = match.value.acf.start_date.split(' ')
startDate = startDate
startTime = startTime
let [endDate, endTime] = match.value.acf.end_date.split(' ')
endDate = endDate
endTime = endTime

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
<style>
.game-info-master{
  display: flex;
  width: 100%;
}

</style>