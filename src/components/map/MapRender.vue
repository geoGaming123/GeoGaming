<template>
  <div class="container">
    <h2>{{ gamesStore.formData.title }}</h2>
    <p>{{ gamesStore.formData.description }}</p>
    <p>Start Date: {{ gamesStore.formData.startDate }}</p>
    <p>End Date: {{ gamesStore.formData.endDate }}</p>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()

onMounted(() => {
  gamesStore.loadFromLocalStorage()

  if (gamesStore.startPoint) {
    const { latitude, longitude } = gamesStore.startPoint.position
    const map = L.map('map', {
      center: [latitude, longitude],
      zoom: 15,
      layers: [L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')]
    })

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

      const startPointIcon = L.icon({
        iconUrl: 'https://static.thenounproject.com/png/4418877-200.png',
        iconSize: [50, 50],
        iconAnchor: [12, 41],
        popupAnchor: [0, -30]
      })
      L.marker([latitude, longitude], { icon: startPointIcon })
        .addTo(map)
        .bindPopup('<b>Start Point</b>')

      // Obtenir la position de l'utilisateur
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Ajouter un marqueur pour la position de l'utilisateur
            L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup('Vous êtes ici!')
              .openPopup()
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          }
        )

        // Ajouter la fonctionnalité de suivi en temps réel de la position de l'utilisateur
        const watchUserPosition = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Vérifiez si le marqueur de l'utilisateur existe déjà
            const userMarker = map.getPane('user-marker')
            if (!userMarker) {
              L.marker([latitude, longitude], { pane: 'user-marker' })
                .addTo(map)
                .bindPopup('Vous êtes ici!')
                .openPopup()
            } else {
              userMarker.setLatLng([latitude, longitude])
            }
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          },
          {
            enableHighAccuracy: true,
            maximumAge: 0
          }
        )
      } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.")
      }
    })
  }
})
</script>
