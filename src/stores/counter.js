import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    matches: [],
    matchesPast: [],
    matchesPresent: [],
    matchesFuture: [],
    matchToRank: [],
    dateNow: new Date(),
    myUser: {}
  }),
  getters: {
    getMatches: (state) => state.matches,
    getMatchesPast: (state) => state.matchesPast,
    getMatchesPresent: (state) => state.matchesPresent,
    getMatchesFuture: (state) => state.matchesFuture,
    getMatchToRank: (state) => state.matchToRank,
    getMyUser: (state) => state.myUser
  },
  actions: {
    getAllMatches() {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match?per_page=50')
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
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
        })
        .catch((error) => console.error('Erreur :', error))
    },
    getAMatch(id) {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/' + id)
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
          const playersData = res.acf.players
          this.matchToRank = playersData
        })
        .catch((error) => console.error('Erreur :', error))
    },
    getUser(id) {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/' + id, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwOTEyODE1MiwibmJmIjoxNzA5MTI4MTUyLCJleHAiOjE3MDk3MzI5NTIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.WvWfzVTkalj9yAFVkbMrXREJKrwR61EWEU8xqYfHb7M'
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
