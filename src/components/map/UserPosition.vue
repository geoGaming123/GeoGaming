<script>
import { ref, computed, onBeforeUnmount } from 'vue'
import { useGamesStore } from '@/stores/games'
import * as L from 'leaflet'


export function userposition(map, showMarkers) {
  const gamesStore = useGamesStore()
  const match = computed(() => {
    return gamesStore.oneMatch
  })
  
  console.log("PROPS",showMarkers);  
  const showStartButton = ref(false)
  const startPoint = match.value.acf.start_point.position
  console.log(startPoint);

  
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
    const currentPlayer = gamesStore.oneMatch.acf.players.find(player => player.userId === String(gamesStore.userId));
    if (currentPlayer) {
      const playerMarkers = currentPlayer.marker;
      const foundMarker = playerMarkers.find(m => m.name === marker.name);
      if (foundMarker) {
        foundMarker.isCaptured = true;
      }
    }
  }

  let watchUserPosition 

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

        const currentPlayer = gamesStore.oneMatch.acf.players.find(player => player.userId === String(gamesStore.userId));
        const playerMarkers = currentPlayer?.marker || [];
        console.log(playerMarkers);
        playerMarkers.forEach((marker) => {
          const distance = calculateDistance({ latitude, longitude }, marker.position)
          if (showMarkers.value && distance <= 10 && !marker.isCaptured) {
            marker.isCaptured = true
            const totalBalises = playerMarkers.length
            const balisesRestantes = playerMarkers.filter((m) => !m.isCaptured).length
            const balisesPrises = totalBalises - balisesRestantes
            const message = `Vous avez récupéré ${balisesPrises}/${totalBalises} balise(s). ${balisesRestantes} balise(s) restante(s).`
            alert(message)
            updateMarkerCaptured(marker)
            // gamesStore.updatePlayerMarkers(matchId, playerMarkers)
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
