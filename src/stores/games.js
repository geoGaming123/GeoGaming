// stores/games.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGamesStore = defineStore('games', {
  state: () => ({
    formData: {
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    markers: reactive([]),
    startPoint: reactive(null),
    userMarker: reactive(null),
    userPosition: reactive({})
  }),

  actions: {
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('formData')

      if (storedData) {
        const parsedData = JSON.parse(storedData)

        this.formData = parsedData.formData || this.formData
        this.markers = reactive(parsedData.markers || [])
        this.startPoint = reactive(parsedData.startPoint || null)
        this.userMarker = reactive(parsedData.userMarker || null)
      }
    },

    saveDataToLocalStorage() {
      const cleanData = {
        formData: { ...this.formData },
        markers: this.markers.map((marker) => ({
          name: marker.name,
          position: { ...marker.position },
          isCaptured: false
        })),
        startPoint: this.startPoint
          ? {
              name: this.startPoint.name,
              position: { ...this.startPoint.position }
            }
          : null,
        userMarker: this.userMarker
          ? {
              position: {
                latitude: this.userMarker.getLatLng().lat,
                longitude: this.userMarker.getLatLng().lng
              }
            }
          : null
      }

      localStorage.setItem('formData', JSON.stringify(cleanData))
      console.log('Envoi au localStorage')
    },

    updateStartPoint(startPoint) {
      this.startPoint = startPoint
    },

    updateMarkers(markers) {
      this.markers = reactive(
        markers.map((marker) => ({
          name: marker.name,
          marker: marker.marker,
          position: { ...marker.position },
          isCaptured: false
        }))
      )
    },

    deleteMarker(marker) {
      this.markers = this.markers.filter((m) => m.name !== marker.name)
      // Mettez à jour le store après la suppression du marqueur
      this.updateMarkers(this.markers)
      console.log('supprimer du store')
    },

    // Fonction pour calculer la distance entre deux points en coordonnées géographiques
    calculateDistance(pointA, pointB) {
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
    },

    // Fonction pour mettre à jour l'état de capture d'un marqueur
    updateMarkerCaptured(marker) {
      const index = this.markers.findIndex((m) => m.name === marker.name)
      if (index !== -1) {
        this.markers[index].isCaptured = true
      }
    },

    deleteStartPoint() {
      this.startPoint = null
      console.log('supprimer du store')
      this.updateStartPoint(null)
    },
    updateUserPosition(position) {
      this.userPosition = position // Met à jour la position de l'utilisateur dans le store
    },
    updateUserMarker(marker) {
      // Mettre à jour la référence du marqueur de l'utilisateur dans le store
      this.userMarker = marker
      // Sauvegarder la position du marqueur de l'utilisateur dans le localStorage
      this.saveDataToLocalStorage()
    }
  }
})
