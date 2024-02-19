import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // Define state properties here if needed
    loggedin: true,
    email: ref(''),
    mdp: ref(''),
    pseudo: ref(''),
    avatar: ref(''),
    uid: ref('')
  }),
  actions: {
    // Methods to interact with user data
    async createUser(userData) {
      // Make your API request to create a new user
      const userSignUp = await fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ'
        },
        body: userData
      })
      // Example: await fetch('/api/users', { method: 'POST', body: userData });
      console.log(await userSignUp.json());
    },
    // Add other methods as needed
  },
});
