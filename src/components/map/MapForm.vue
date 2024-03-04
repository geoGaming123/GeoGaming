<template>
  <div>
    <div class="game-map" id="map"></div>
    <h2>Ajouter</h2>
    <div class="controls">
      <div v-if="markersVisible">
        <MapAddMarkers :map="map"></MapAddMarkers>
      </div>
      <div v-if="startPointVisible">
        <MapAddStartPoint :map="map"></MapAddStartPoint>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as L from 'leaflet'
import { useGeoSearchControl } from './MapSearchControl.vue'
import MapAddMarkers from './MapAddMarkers.vue'
import MapAddStartPoint from './MapAddStartPoint.vue'

const props = defineProps([
  'searchBarVisible',
  'startPointVisible',
  'markersVisible',
  'infoVisible'
])
const map = ref(null)
const tiles = ref(null)

onMounted(() => {
  // MAP INIT
  map.value = L.map('map', {
    center: [50.8503, 4.3517],
    zoom: 15
  })

  tiles.value = new L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 15
  }).addTo(map.value)

  if (props.searchBarVisible === true) {
    // ADD SEARCH BAR
    const { searchControl } = useGeoSearchControl(map.value)
  }
})
</script>

<style>
.map-container {
  width: 100%;
}
.controls {
  display: flex;
  flex-direction: row;
  gap: 15px;
  margin: 0 0 10px;
  justify-content: space-between;
}
</style>
