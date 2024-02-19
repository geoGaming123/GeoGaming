<template>
  <div class="container">
    <h2>{{ gamesStore.formData.title }}</h2>
    <p>{{ gamesStore.formData.description }}</p>
    <p>Start Date: {{ gamesStore.formData.startDate }}</p>
    <p>End Date: {{ gamesStore.formData.endDate }}</p>
    <div id="map"></div>
    <button v-if="showStartButton" @click="startGame">Lancer le chrono</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as L from 'leaflet'
import { useGamesStore } from '@/stores/games'

const gamesStore = useGamesStore()
const showStartButton = ref(false)

// Fonction à appeler lorsque le jeu démarre
const startGame = () => {
  // Logique pour démarrer le jeu
  alert('Game lancer !!')
}

// Fonction pour calculer la distance entre deux points en coordonnées géographiques
const calculateDistance = (pointA, pointB) => {
  const earthRadius = 6371e3 // Rayon de la Terre en mètres
  const lat1 = (pointA.latitude * Math.PI) / 180 // Latitude du point A en radians
  const lat2 = (pointB.latitude * Math.PI) / 180 // Latitude du point B en radians
  const deltaLat = ((pointB.latitude - pointA.latitude) * Math.PI) / 180 // Différence de latitude en radians
  const deltaLng = ((pointB.longitude - pointA.longitude) * Math.PI) / 180 // Différence de longitude en radians

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  const distance = earthRadius * c // Distance en mètres
  return distance
}

// Fonction pour mettre à jour l'état de capture d'un marqueur
const updateMarkerCaptured = (marker) => {
  const index = gamesStore.markers.findIndex((m) => m.name === marker.name)
  if (index !== -1) {
    gamesStore.markers[index].isCaptured = true
  }
}

onMounted(() => {
  // Charger les données depuis le localStorage de manière asynchrone
  gamesStore.loadFromLocalStorage()

  // Utiliser les coordonnées du startPoint comme centre initial de la carte
  if (gamesStore.startPoint) {
    const { latitude, longitude } = gamesStore.startPoint.position

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
        const leafletMarker = L.marker([latitude, longitude], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<b>${marker.name}</b>`)

        // Assurez-vous que le marqueur a une référence à leafletMarker
        marker.leafletMarker = leafletMarker
      })

      // Ajouter un marqueur pour le startPoint
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
            const userMarker = L.marker([latitude, longitude])
              .addTo(map)
              .bindPopup('Vous êtes ici!')
              .openPopup()
            // Stocker la référence du marqueur de l'utilisateur dans le store
            gamesStore.updateUserMarker(userMarker)
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          }
        )

        // Ajouter la fonctionnalité de suivi en temps réel de la position de l'utilisateur
        const watchUserPosition = navigator.geolocation.watchPosition(
          (position) => {
            const { latitude, longitude } = position.coords
            // Mettre à jour la position du joueur dans le store
            gamesStore.updateUserPosition({ latitude, longitude })
            // Vérifiez si le marqueur de l'utilisateur existe déjà
            if (gamesStore.userMarker) {
              gamesStore.userMarker.setLatLng([latitude, longitude])
            } else {
              const userMarker = L.marker([latitude, longitude])
                .addTo(map)
                .bindPopup('Vous êtes ici!')
                .openPopup()
              gamesStore.updateUserMarker(userMarker)
            }

            // Vérifier la distance par rapport au point de départ
            const distanceToStart = calculateDistance(
              { latitude, longitude },
              gamesStore.startPoint.position
            )

            // Mettre à jour l'affichage du bouton "Start" en fonction de la distance
            if (distanceToStart <= 10) {
              showStartButton.value = true
            } else {
              showStartButton.value = false
            }

            // Mettre à jour les marqueurs capturés lorsque l'utilisateur est à moins de 10 mètres
            gamesStore.markers.forEach((marker) => {
              const distance = calculateDistance({ latitude, longitude }, marker.position)

              if (distance <= 5 && !marker.isCaptured) {
                marker.isCaptured = true
                marker.leafletMarker.setOpacity(0.4)
                const totalBalises = gamesStore.markers.length
                const balisesRestantes = gamesStore.markers.filter((m) => !m.isCaptured).length
                const balisesPrises = totalBalises - balisesRestantes
                const message = `Vous avez récupéré ${balisesPrises}/${totalBalises} balise(s). ${balisesRestantes} balise(s) restante(s).`
                alert(message)
                updateMarkerCaptured(marker) // Mettre à jour l'état de capture du marqueur
              }
            })
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error.message)
          },
          {
            enableHighAccuracy: true, // Activer une haute précision de la géolocalisation
            maximumAge: 0 // Ne pas utiliser de position mise en cache
          }
        )
      } else {
        console.error("La géolocalisation n'est pas prise en charge par ce navigateur.")
      }
    })
  }
})
</script>
