<script>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useGamesStore } from '@/stores/games'
import * as L from 'leaflet'

export function userposition(map) {
  const gamesStore = useGamesStore()

  const match = computed(() => {
    return gamesStore.oneMatch
  })

  const showStartButton = ref(false)
  const startPoint = match.value.acf.start_point.position
  const markers = match.value.acf.markers

  console.log('START : ', startPoint)

  const calculateDistance = (pointA, pointB) => {
    const earthRadius = 6371e3
    const lat1 = (pointA.latitude * Math.PI) / 180
    const lat2 = (pointB.latitude * Math.PI) / 180
    const deltaLat = ((pointB.latitude - pointA.latitude) * Math.PI) / 180
    const deltaLng = ((pointB.longitude - pointA.longitude) * Math.PI) / 180

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    const distance = earthRadius * c
    return distance
  }

  const updateMarkerCaptured = (marker) => {
    const index = markers.findIndex((m) => m.name === marker.name)
    if (index !== -1) {
      markers[index].isCaptured = true
    }
  }

  let watchUserPosition // Déclarer en dehors de la condition pour le garder accessible à onBeforeUnmount

  // Obtenir la position de l'utilisateur
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const userMarker = L.marker([latitude, longitude])
          .addTo(map)
          .bindPopup('Vous êtes ici!')
          .openPopup()
        gamesStore.updateUserMarker(userMarker)
      },
      (error) => {
        console.error('Erreur de géolocalisation :', error.message)
      }
    )

    // Ajouter la fonctionnalité de suivi en temps réel de la position de l'utilisateur
     watchUserPosition = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        gamesStore.updateUserPosition({ latitude, longitude })

        if (gamesStore.userMarker) {
          gamesStore.userMarker.setLatLng([latitude, longitude])
        } else {
          const userMarker = L.marker([latitude, longitude])
            .addTo(map)
            .bindPopup('Vous êtes ici!')
            .openPopup()
          gamesStore.updateUserMarker(userMarker)
        }

        const distanceToStart = calculateDistance({ latitude, longitude }, startPoint)

        if (distanceToStart <= 10) {
          showStartButton.value = true
        } else {
          showStartButton.value = false
        }

        markers.forEach((marker) => {
          const distance = calculateDistance({ latitude, longitude }, marker.position)
          if (distance <= 10 && !marker.isCaptured) {
            marker.isCaptured = true
            marker.leafletMarker.setOpacity(0.4)
            const totalBalises = markers.length
            const balisesRestantes = markers.filter((m) => !m.isCaptured).length
            const balisesPrises = totalBalises - balisesRestantes
            const message = `Vous avez récupéré ${balisesPrises}/${totalBalises} balise(s). ${balisesRestantes} balise(s) restante(s).`
            alert(message)
            updateMarkerCaptured(marker)
          }
        })
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

  onBeforeUnmount(() => {
    if (watchUserPosition) {
      navigator.geolocation.clearWatch(watchUserPosition)
    }
  })

  return { showStartButton }
}
</script>
