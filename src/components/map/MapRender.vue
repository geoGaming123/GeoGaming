<template>
  <div class="container">
    <h2>{{ gamesStore.title }}</h2>
    <p>{{ gamesStore.description }}</p>
    <p>Start Date: {{ gamesStore.startDate }}</p>
    <p>End Date: {{ gamesStore.endDate }}</p>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()
const id = 325;

onMounted(() => {
  gamesStore.loadFromLocalStorage()

  // Utiliser les coordonnées du start_point comme centre initial de la carte
  if (gamesStore.start_point && gamesStore.start_point.position) {
    const { latitude, longitude } = gamesStore.start_point.position

    // Vérifier si les coordonnées sont valides
    if (!isNaN(latitude) && !isNaN(longitude)) {
      // Initialiser une nouvelle carte sans utiliser les props
      const map = L.map('map', {
        center: [latitude, longitude],
        zoom: 15,
        layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
      })

      // Ajouter des marqueurs pour les données stockées une fois que la carte est prête
      map.whenReady(() => {
        gamesStore.markers.forEach((marker) => {
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
        })

        // Ajouter un marqueur pour le start_point
        const startPointIcon = L.icon({
          iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
          iconSize: [50, 50],
          iconAnchor: [12, 41],
          popupAnchor: [0, -30]
        })
        L.marker([latitude, longitude], { icon: startPointIcon })
          .addTo(map)
          .bindPopup('<b>Start Point</b>')
      })
    }
  }
})
</script>
