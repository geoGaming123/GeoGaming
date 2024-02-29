import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // Define state properties here if needed
    loggedin: true,
    email: ref(''),
    mdp: ref(''),
    pseudo: ref(''),
    avatar: ref(null),
    uid: ref('')
  }),
  actions: {
    // Methods to interact with user data
    async createUser(userData) {
      // Make your API request to create a new user
      const userSignUp = await fetch('utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ'
        },
        body: userData
      })
      // Example: await fetch('/api/users', { method: 'POST', body: userData });
      console.log(await userSignUp.json())
    }
    // Add other methods as needed
  }
})

/*{
	"username":"userone",
	"email":"userone@gmail.com",
	"password":"userone",
	"acf":{
		"email":"userone@gmail.com",
		"mot_de_passe":"userone",
		"pseudo":"userone",
		"uid":"userone"
	}
}
*/
