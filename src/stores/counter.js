import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    matches : [],
    matchesPast : [],
    matchesPresent : [],
    matchesFuture : [],
    matchToRank: [],
    dateNow : new Date()
  }),
  getters: {
    getMatches: (state) => state.matches,
    getMatchesPast: (state) => state.matchesPast,
    getMatchesPresent: (state) => state.matchesPresent,
    getMatchesFuture: (state) => state.matchesFuture,
    getMatchToRank: (state) => state.matchToRank
  },
  actions: {
    
    getAllMatches() {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match?per_page=50')
      .then(res => res.json())
      .then(res => {
        console.log(res)
        this.matches = res
        this.matchesFuture = res.filter(matches => new Date(matches.acf.start_date) > this.dateNow)
        this.matchesPast = res.filter(matches => new Date(matches.acf.end_date) < this.dateNow)
        this.matchesPresent = res.filter(matches => new Date(matches.acf.end_date) > this.dateNow && this.dateNow > new Date(matches.acf.start_date))
      })
      .catch(error => console.error('Erreur :', error));
    },
    getAMatch(id) {
      fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/match/' + id)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        const playersData = res.acf.players
        console.log(playersData)
        this.matchToRank = playersData
      })
      .catch(error => console.error('Erreur :', error));
    }
  },
})