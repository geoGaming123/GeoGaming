<template>
  <div>
    <form @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="gamesStore.formData.title" />

      <label for="description">Description:</label>
      <textarea id="description" v-model="gamesStore.formData.description"></textarea>

      <label>Date de début:</label>
      <input type="datetime-local" v-model="gamesStore.formData.startDate" />

      <label>Date de fin:</label>
      <input type="datetime-local" v-model="gamesStore.formData.endDate" />

      <div class="map-container" id="map"></div>
      <button type="submit">Submit</button>
    </form>
  </div>
  <MapAddStartPoint :map="map"></MapAddStartPoint>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'
import * as GeoSearch from 'leaflet-geosearch'

const props = defineProps('id')
const gamesStore = useGamesStore()
const matchId = props.id


gamesStore.getMatch(matchId)


const match = ref(
  computed(() => {
    return gamesStore.oneMatch
  })
)

console.log(matchId)
onMounted(() => {})

setTimeout(() => {
  const startPoint = match.value.acf.start_point
  const markers = match.value.acf.markers

  const latitude = startPoint.position.latitude
  const longitude = startPoint.position.longitude

  const map = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })

  map.whenReady(() => {
    markers.forEach((marker) => {
      const { latitude, longitude } = marker.position
      const markerIcon = L.icon({
        iconUrl: 'https://www.svgrepo.com/show/374529/address.svg',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
      })
      L.marker([latitude, longitude], { icon: markerIcon })
        .addTo(map)
        .bindPopup(`<b>${marker.name}</b>`)
      allmarker = markers.marker
      console.log
    })

    /////
    // const startPointIcon = L.icon({
    //   iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
    //   iconSize: [50, 50],
    //   iconAnchor: [12, 41],
    //   popupAnchor: [0, -30],
    // });

    // L.marker([latitude, longitude], { icon: startPointIcon })
    //   .addTo(map)
    //   .bindPopup('<b>Start Point</b>');

    // ADD SEARCH BAR
    const searchControl = new GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      style: 'bar',
      showMarker: false
    })

    map.addControl(searchControl)
  })
}, 1000)
</script>

<style>
#map {
  width: 100%;
  height: 45vh;
}
</style>
