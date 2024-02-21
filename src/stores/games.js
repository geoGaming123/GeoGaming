// stores/games.js
import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useGamesStore = defineStore('games', {
  id: 'test',
  state: () => ({
    formData: {
      title: '',
      description: '',
      startDate: '',
      endDate: ''
    },
    markers: [],
    startPoint: null,
    userPosition: {},
    userMarker: null,
    match:{},


  }),


  getters: {
    oneMatch: (state) => {
      return state.match
    }
  },
  actions: {


async getMatch(matchId) {
  await fetch(`https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`)

            .then(resp => resp.json())
            .then(resp => {
                console.log(resp)
                this.match = resp
            })
            .catch (err => console.log(err))
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
            isCaptured: false
          })),
          start_point: this.startPoint
            ? {
                name: this.startPoint.name,
                position: { ...this.startPoint.position },
                startGame: false,
                endGame: false,
              }
            : null,
          masteruid: '2', // Modifié en brut
          players: [
            {
              userId: '5',
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
          position: { ...marker.position },
          isCaptured: false
        }))
      )
    },

    updateStartPoint(startPoint) {
      this.startPoint = startPoint
    },

    async deleteGame(matchId) {
      const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ";
      try {
        const response = await fetch(`https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Replace with your actual authorization token
          },
        });

        if (response.ok) {
          console.log('Game deleted successfully.');
          // Add any additional logic after successfully deleting the game
        } else {
          console.error('Error deleting game:', response.status);
          // Add error handling logic if needed
        }
      } catch (error) {
        console.error('Error deleting game:', error);
        // Add error handling logic if needed
      }
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
      this.saveDataToLocalStorage()
    }
  }
})

