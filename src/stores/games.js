// stores/games.js
import { defineStore } from 'pinia';
import { reactive } from 'vue';

export const useGamesStore = defineStore('games', {
  state: () => ({
    formData: {
      title: '',
      description: '',
      startDate: '',
      endDate: '',
    },
    markers: reactive([]),
    startPoint: reactive({}), 
  }),

  actions: {
    loadFromLocalStorage() {
      const storedData = localStorage.getItem('formData');

      if (storedData) {
        const parsedData = JSON.parse(storedData);

        this.formData = parsedData.formData || this.formData;
        this.markers = reactive(parsedData.markers || []);
        this.startPoint = reactive(parsedData.startPoint || null);
      }
    },

    saveDataToLocalStorage() {
      const cleanData = {
        formData: { ...this.formData },
        markers: this.markers.map((marker) => ({
          name: marker.name,
          position: { ...marker.position },
        })),
        startPoint: this.startPoint
          ? {
              name: this.startPoint.name,
              position: { ...this.startPoint.position },
            }
          : null,
      };

      localStorage.setItem('formData', JSON.stringify(cleanData));
      console.log('Envoi au localStorage');
    },

    updateStartPoint(startPoint) {
      this.startPoint = startPoint;
    },

    updateMarkers(markers) {
      this.markers = reactive(
        markers.map((marker) => ({
          name: marker.name,
          marker: marker.marker,
          position: { ...marker.position },
        }))
      );
    },

    deleteMarker(marker) {
      this.markers = this.markers.filter((m) => m.name !== marker.name);
      // Mettez à jour le store après la suppression du marqueur
      this.updateMarkers(this.markers);
      console.log("supprimer du store");
    },

    deleteStartPoint() {
      this.startPoint = null;
      console.log("supprimer du store");
      updateStartPoint()
    },
  },
});

