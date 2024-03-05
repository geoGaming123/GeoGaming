import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', {
  state: () => ({
    matches: [],
    matchesPast: [],
    matchesPresent: [],
    matchesFuture: [],
    matchToRank: [],
    dateNow: null,
    myUser: {},
    incrementPast: 0,
    incrementPresent: 0,
    incrementFutur: 0,
    isLoading: 0
  }),
  getters: {
    getMatches: (state) => state.matches,
    getMatchesPast: (state) => state.matchesPast,
    getMatchesPresent: (state) => state.matchesPresent,
    getMatchesFuture: (state) => state.matchesFuture,
    getMatchToRank: (state) => state.matchToRank,
    getMyUser: (state) => state.myUser,
    isItLoading: (state) => state.isLoading
  },
  actions: {
    getAllMatches() {
      this.isLoading++
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match?per_page=50')
        .then((res) => res.json())
        .then((res) => {
          this.dateNow = new Date()
          this.matches = res
          this.matchesFuture = res.filter(
            (matches) => new Date(matches.acf.start_date) > this.dateNow
          )
          this.matchesPast = res.filter((matches) => new Date(matches.acf.end_date) < this.dateNow)
          this.matchesPresent = res.filter(
            (matches) =>
              new Date(matches.acf.end_date) > this.dateNow &&
              this.dateNow > new Date(matches.acf.start_date)
          )
          this.isLoading--
        })
        .catch((error) => console.error('Erreur :', error))
    },
    getAMatch(id) {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/' + id)
        .then((res) => res.json())
        .then((res) => {
          const playersData = res.acf.players
          this.matchToRank = playersData
        })
        .catch((error) => console.error('Erreur :', error))
    },
    getUser(id) {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/' + id, {
        method: 'GET',
        headers: {
          Authorization:
            'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwOTEyODE1MiwibmJmIjoxNzA5MTI4MTUyLCJleHAiOjE3MDk3MzI5NTIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.WvWfzVTkalj9yAFVkbMrXREJKrwR61EWEU8xqYfHb7M'
        }
      })
        .then((res) => res.json())
        .then((res) => {
          this.myUser = res
        })
        .catch((error) => console.error('Erreur :', error))
    }
  }
})
