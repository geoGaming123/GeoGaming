import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { useUserStore } from './user'

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
    match: {},
    matches: [],
    players: [],
    userId: '',
    userToken: '',
    userName: ''
  }),

  getters: {
    getuserId: (state) => {
      const userStore = useUserStore()
      return (state.userId = userStore.myID)
    },

    getUserToken: (state) => {
      const userStore = useUserStore()
      return (state.userToken = userStore.myToken)
    },

    getUserName: (state) => {
      const userStore = useUserStore()
      return state.userName = userStore.userData.username
    },

    oneMatch: (state) => {
      return state.match
    },

    allMatches: (state) => {
      return state.matches
    },

    sendUserId: (state) => {
      return state.userId
    }
  },
  actions: {

    compareAndPatchData() {
      // Récupérez le match actuel du state
      const currentMatch = this.match;
    
      if (
        this.formData.title !== currentMatch.acf.title ||
        this.formData.description !== currentMatch.acf.description ||
        this.formData.startDate !== currentMatch.acf.startDate ||
        this.formData.endDate !== currentMatch.acf.endDate ||
        // Ajoutez d'autres conditions de comparaison si nécessaire
        JSON.stringify(this.markers) !== JSON.stringify(currentMatch.acf.markers) ||
        JSON.stringify(this.startPoint) !== JSON.stringify(currentMatch.acf.start_point)
      ) {
        // Si des modifications sont détectées, effectuez le patch avec les données actuelles
        this.patchData();
      }
    },

    async getMatches() {
      try {
        const response = await fetch(
          `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/?per_page=100`
        )
        const data = await response.json()

        // Set the matches in the store
        this.matches = data
      } catch (err) {
        console.error('Error fetching matches:', err)
      }
    },

    async getMatch(matchId) {
      const allMatches = this.allMatches

      // Find the match in the already fetched matches
      const match = allMatches.find((m) => Number(m.id) === Number(matchId))

      if (match) {
        // If the match is found in the stored matches, set it in the store
        this.match = match
      } else {
        // If the match is not found, you can still make an API request if needed
        try {
          const response = await fetch(
            `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`
          )
          const data = await response.json()

          // Set the match in the store
          this.match = data
        } catch (error) {
          console.error('Error fetching match:', error)
        }
      }
    },

    async joinGame(matchId) {
      const userId = this.userId
      try {
        const token = this.userToken

        const matchData = {
          fields: {
            players: [
              {
                userId: String(userId),
                position: {
                  latitude: '',
                  longitude: ''
                },
                marker: [] // Laissez le tableau de marqueurs vide pour le moment
              }
            ]
          }
        }

        // Récupérer les informations des joueurs du champ acf
        const oneMatch = this.oneMatch
        const existingPlayers = oneMatch.acf.players || []

        // Vérifier si l'ID du joueur n'est pas déjà présent dans la liste
        const playerExists = existingPlayers.some((player) => player.userId === String(userId))

        if (playerExists) {
          return // Arrêter la fonction si le joueur existe déjà
        }

        // Récupérer les informations des marqueurs du champ acf
        const markers = []
        oneMatch.acf.markers.forEach((marker, index) => {
          markers.push({
            id: index, // Utilisez l'index comme identifiant
            name: marker.name,
            position: marker.position,
            isCaptured: false,
            penality: marker.penality
          })
        })

        // Mettre les informations des marqueurs dans le joueur qui vient de rejoindre
        matchData.fields.players[0].marker = markers

        // Ajouter le nouveau joueur à la liste existante
        existingPlayers.push({
          userId: String(userId),
          name: this.userName,
          position: {
            latitude: '',
            longitude: ''
          },
          marker: markers,
          time: '0',
          score: '0',
          start_Game: false
        })

        // Envoyer la requête PATCH avec les données mises à jour
        const response = await fetch(
          `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              fields: {
                players: existingPlayers
              }
            })
          }
        )

        if (response.ok) {
          // Ajouter toute logique supplémentaire après avoir rejoint le jeu avec succès
        } else {
          console.error('Error joining game:', response.status)
          // Ajouter une logique de gestion des erreurs si nécessaire
        }
      } catch (error) {
        console.error('Error joining game:', error)
        // Ajouter une logique de gestion des erreurs si nécessaire
      }
    },

    async leaveGame(matchId) {
      const userId = this.userId
      try {
        const token = this.userToken

        // Récupérer les informations des joueurs du champ acf
        const oneMatch = this.oneMatch
        const existingPlayers = oneMatch.acf.players || []

        // Vérifier si l'ID du joueur est présent dans la liste
        const playerIndex = existingPlayers.findIndex((player) => player.userId === String(userId))

        if (playerIndex === -1) {
          return // Arrêter la fonction si le joueur n'est pas trouvé
        }

        // Retirer le joueur de la liste existante
        existingPlayers.splice(playerIndex, 1)

        // Envoyer la requête PATCH avec les données mises à jour
        const response = await fetch(
          `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
              fields: {
                players: existingPlayers
              }
            })
          }
        )

        if (response.ok) {
          // Ajouter toute logique supplémentaire après avoir quitté le jeu avec succès
        } else {
          console.error('Error leaving game:', response.status)
          // Ajouter une logique de gestion des erreurs si nécessaire
        }
      } catch (error) {
        console.error('Error leaving game:', error)
        // Ajouter une logique de gestion des erreurs si nécessaire
      }
    },

    postMatchData() {
      const token = this.userToken

      const matchData = {
        status: 'publish',
        title: this.formData.title,
        fields: {
          title: this.formData.title,
          description: this.formData.description,
          start_date: this.formData.startDate,
          end_date: this.formData.endDate,
          markers: this.markers.map((marker) => ({
            name: marker.name,
            position: { ...marker.position },
            penality: '20',
            isCaptured: false
          })),
          start_point: this.startPoint
            ? {
                name: this.startPoint.name,
                position: { ...this.startPoint.position },
                startGame: false,
                endGame: false
              }
            : null,
          masteruid: this.userId,
          players: []
        }
      }

      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(matchData)
      })
        .then((response) => response.json())
        .then((data) => {
          // Ajoutez ici toute logique de gestion de la réponse de l'API
        })
        .catch((error) => {
          console.error('Erreur lors de la requête POST :', error)
          // Ajoutez ici toute logique de gestion des erreurs
        })
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
      const token = this.userToken
      try {
        const response = await fetch(
          `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/${matchId}`,
          {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}` // Replace with your actual authorization token
            }
          }
        )

        if (response.ok) {
          // Add any additional logic after successfully deleting the game
        } else {
          console.error('Error deleting game:', response.status)
          // Add error handling logic if needed
        }
      } catch (error) {
        console.error('Error deleting game:', error)
        // Add error handling logic if needed
      }
    },

    deleteMarker(marker) {
      this.markers = this.markers.filter((m) => m.name !== marker.name)
      // Mettez à jour le store après la suppression du marqueur
      this.updateMarkers(this.markers)
    },

    deleteStartPoint() {
      this.startPoint = null
      this.updateStartPoint(null)
    },

    updateUserPosition(position) {
      // Mettre à jour la position du joueur dans le store
      this.userPosition = position
    },

    updateUserMarker(marker) {
      // Mettre à jour la référence du marqueur de l'utilisateur dans le store
      this.userMarker = marker
    }
  }
})
