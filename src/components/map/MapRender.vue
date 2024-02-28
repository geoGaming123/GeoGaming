<template>
  <h2>{{ match.acf.title }}</h2>
  <p>{{ match.acf.description }}</p>
  <p>Start Date: {{ match.acf.start_date }}</p>
  <p>End Date: {{ match.acf.end_date }}</p>

    <div id="map"></div>
    
    <div v-if="props.timer">
      <Timer></Timer>
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

const gamesStore = useGamesStore()
const props = defineProps(['id', 'delete', 'join', 'leave', 'startpoint', 'position', 'markers', 'timer'])
const matchId = props.id
function updateShowMarkers(value) {
  showMarkers.value = value
  console.log(showMarkers)
}

gamesStore.getMatch(matchId)

const match = ref(
  computed(() => {
    return gamesStore.oneMatch
  })
)

onMounted(() => {
  const startPoint = match.value.acf.start_point
  const markers = match.value.acf.markers

  const latitude = startPoint.position.latitude
  const longitude = startPoint.position.longitude

  const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')],
  })

  map.whenReady(() => {
    if (showMarkers.value) {
      console.log('showMarkers est sur true')
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
      console.log('showMarkers est sur false')
    }

    const startPointIcon = L.icon({
      iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
      iconSize: [50, 50],
      iconAnchor: [12, 41],
      popupAnchor: [0, -30],
    })
    L.marker([latitude, longitude], { icon: startPointIcon })
      .addTo(map)
      .bindPopup('<b>Start Point</b>')
  }

  if (props.position) {
    userposition(map)
  }
})
</script>





