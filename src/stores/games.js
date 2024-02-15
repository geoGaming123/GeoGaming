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
    startPoint: reactive({}),
    userPosition: reactive({}),
    userMarker: null
  }),

  actions: {
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('formData')

      if (storedData) {
        const parsedData = JSON.parse(storedData)

        this.formData = parsedData.formData || this.formData
        this.markers = reactive(parsedData.markers || [])
        this.startPoint = reactive(parsedData.startPoint || null)
        this.userPosition = reactive(parsedData.userPosition || null)
      }
    },

    saveDataToLocalStorage() {
      const cleanData = {
        formData: { ...this.formData },
        markers: this.markers.map((marker) => ({
          name: marker.name,
          position: { ...marker.position }
        })),
        startPoint: this.startPoint
          ? {
              name: this.startPoint.name,
              position: { ...this.startPoint.position }
            }
          : null,
        userPosition: this.userPosition
      }

      localStorage.setItem('formData', JSON.stringify(cleanData))
      console.log('Envoi au localStorage')
    },

    updateStartPoint(startPoint) {
      this.startPoint = startPoint
        ? {
            name: startPoint.name,
            position: { ...startPoint.position }
          }
        : null
    },

    updateMarkers(markers) {
      // Retirer les marqueurs obsolètes du magasin
      this.markers.forEach((m) => {
        if (!markers.find((newMarker) => newMarker.marker === m.marker)) {
          this.removeMarker(m.marker)
        }
      })

      // Mettre à jour le tableau des marqueurs dans le magasin
      this.markers = reactive(
        markers.map((marker) => ({
          name: marker.name,
          marker: marker.marker,
          position: { ...marker.position }
        }))
      )
    },

    removeMarker(marker) {
      // Filtrer le tableau des marqueurs dans le magasin
      this.markers = this.markers.filter((m) => m.marker !== marker)
    },

    updateUserPosition(position) {
      // Mettre à jour la position du joueur dans le store
      this.userPosition = position
      // Sauvegarder la position du joueur dans le localStorage
      this.saveDataToLocalStorage()
    },

    updateUserMarker(marker) {
      // Mettre à jour la référence du marqueur de l'utilisateur dans le store
      this.userMarker = marker
    }
  }
})
