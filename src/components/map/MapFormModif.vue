<template>
<div class='gameform'>
    <form @submit.prevent="submitForm">
      <label for="title">Title:</label>
      <input type="text" id="title" v-model="match.acf.title" />

      <label for="description">Description:</label>
      <textarea id="description" v-model="match.acf.description"></textarea>

      <label>Date de début:</label>
      <input type="datetime-local" v-model="match.acf.start_date" />

      <label>Date de fin:</label>
      <input type="datetime-local" v-model="match.acf.end_date" />

      <div class="game-map" id="map"></div>
      <div class="game-btns">
      <MapAddMarkers :map="map" v-if="modif === false"></MapAddMarkers>
      <MapAddStartPoint :map="map" v-if="modif === false"></MapAddStartPoint>
      <button @click.prevent="confirmModifyMap" v-show="modif">Modifier la carte</button>
    </div>
      <button class="green" type="submit">Submit</button>
    </form>
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'
import { useGeoSearchControl } from './MapSearchControl.vue'
import MapAddMarkers from './MapAddMarkers.vue'
import MapAddStartPoint from './MapAddStartPoint.vue'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const gamesStore = useGamesStore()
const matchId = props.id
const router = useRouter()  
gamesStore.getMatch(matchId)

const map = ref(null)
const modif = ref(true)

const match = computed(() => {
  return gamesStore.oneMatch
})

const confirmModifyMap = () => {
  const confirmation = window.confirm("Êtes-vous sûr de vouloir modifier la carte?");

  if (confirmation) {
    modifyMap();
  }
};

const modifyMap = () => {
  modif.value = false
}

const submitForm = () => {
  alert("votre partie à été modifié")
router.go(-1)
}

onMounted(() => {
  const startPoint = match.value.acf.start_point
  const latitude = startPoint.position.latitude
  const longitude = startPoint.position.longitude
  const markers = match.value.acf.markers

  map.value = L.map('map', {
    center: [latitude, longitude],
    zoom: 15,
    layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
  })

  map.value.whenReady(() => {
    if (modif.value) {
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

        marker.leafletMarker = leafletMarker.addTo(map.value)
      })

      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
      })
      startPoint.leafletMarker = L.marker([latitude, longitude], { icon: startPointIcon })
        .addTo(map.value)
        .bindPopup('<b>Start Point</b>')
    }

    const { searchControl } = useGeoSearchControl(map.value)
  })

  // Ajouter un watcher pour réagir aux changements de modif.value
  watch(modif, (newModif) => {
    if (!newModif) {
      // Supprimer les marqueurs et le point de départ si modif est faux
      markers.forEach((marker) => {
        map.value.removeLayer(marker.leafletMarker)
      })
      map.value.removeLayer(startPoint.leafletMarker)
    }
  })
})
</script>

<style>
</style>



