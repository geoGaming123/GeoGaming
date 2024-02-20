import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    matches : [],
    matchesPast : [],
    matchesPresent : [],
    matchesFuture : [],
    dateNow : new Date()
  }),
  getters: {
    getMatches: (state) => state.matches,
    getMatchesPast: (state) => state.matchesPast,
    getMatchesPresent: (state) => state.matchesPresent,
    getMatchesFuture: (state) => state.matchesFuture,
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
    }
  },
})