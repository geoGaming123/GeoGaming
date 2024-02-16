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
    userPosition: reactive({}),
    userMarker: null
  }),

  actions: {

    

loadFromLocalStorage() {
  const storedData = localStorage.getItem('testData');

  if (storedData) {
    const parsedData = JSON.parse(storedData);

    this.title = parsedData.title || this.title;
    this.description = parsedData.description || this.description;
    this.startDate = parsedData.startDate || this.startDate;
    this.endDate = parsedData.endDate || this.endDate;
    this.markers = reactive(parsedData.markers || []);
    this.start_point = reactive(parsedData.start_point || null);
    this.userPosition = reactive(parsedData.userPosition || null);
  }
},



getMatches() {
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ";

      // Fetch matches data from the API
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          // Update the matches state with the retrieved data
          this.matches = reactive(data);
          console.log('Matches retrieved from API:', this.matches);
        })
        .catch(error => {
          console.error('Error fetching matches from API:', error);
        });
    },
  


    
    postMatchData() {
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ";
    
      const matchData = {
        status: "publish",
        title: this.formData.title,
        fields: {
          title: this.formData.title,
          description: this.formData.description,
          start_date: this.formData.startDate,
          end_date: this.formData.endDate,
          markers: this.markers.map((marker) => ({
            name: marker.name,
            position: { ...marker.position },
            penality: "20",
          })),
          start_point: this.startPoint
            ? {
                name: this.startPoint.name,
                position: { ...this.startPoint.position },
              }
            : null,
          masteruid: '1', // Modifié en brut
          players: [
            {
              userId: '2',
              time: '10',
              markers: [
                {
                  marker_id: '1',
                  check: 'false',
                },
                {
                  marker_id: '3',
                  check: 'false',
                },
              ],
            },
            {
              userId: '3',
              time: '10',
              markers: [
                {
                  marker_id: '1',
                  check: 'false',
                },
                {
                  marker_id: '3',
                  check: 'false',
                },
              ],
            },
          ],
        },
      };
    
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(matchData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Réponse de l\'API :', data);
          // Ajoutez ici toute logique de gestion de la réponse de l'API
        })
        .catch(error => {
          console.error('Erreur lors de la requête POST :', error);
          // Ajoutez ici toute logique de gestion des erreurs
        });
    },
    



    updateMarkers(markers) {
      this.markers = reactive(
        markers.map((marker) => ({
          name: marker.name,
          marker: marker.marker,
          position: { ...marker.position }
        }))
      )
    },

    updateStartPoint(startPoint) {
      this.startPoint = startPoint
    },

    deleteMarker(marker) {
      this.markers = this.markers.filter((m) => m.name !== marker.name)
      // Mettez à jour le store après la suppression du marqueur
      this.updateMarkers(this.markers)
      console.log('supprimer du store')
    },

    deleteStartPoint() {
      this.startPoint = null
      console.log('supprimer du store')
      this.updateStartPoint(null)
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

