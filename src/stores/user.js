import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // Define state properties here if needed
    loggedin: true,
    admintoken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwOTEyODE1MiwibmJmIjoxNzA5MTI4MTUyLCJleHAiOjE3MDk3MzI5NTIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.WvWfzVTkalj9yAFVkbMrXREJKrwR61EWEU8xqYfHb7M',
    myID: ref(''),
    myToken: ref(''),
    pageBool: ref(false),
    userData: {
      username: ref(''),
	    email:ref(''),
	    password:ref(''),
	    acf:{
		    pseudo: ref(''),
		    uid: ref('')
      }
    },
    userLogin: {
      username: ref(''),
      password: ref('')
    }
  }),
  getters: {

    username() {
      return this.userData.acf.pseudo = this.userData.username
    }
  },
  actions: {
    rerout() {
      this.$router.push({ path: '/dash' })
    },
    // Methods to interact with user data
    async createUser() {
      // Make your API request to create a new user
      const userSignUp = await fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            `Bearer ${this.admintoken}`
        },
        body: JSON.stringify(this.userData)
      })
      // Example: await fetch('/api/users', { method: 'POST', body: userData });
      console.log(await userSignUp.json())
    
},
    async loginUser() {
      try {
        const userLoginData = await fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/jwt-auth/v1/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.userLogin)
      })

      if (!userLoginData.ok) {
        throw new Error('Failed to login')
      }

      const userLoginInfo = await userLoginData.json()
      const userToken = userLoginInfo.token
      console.log(await userLoginInfo)
      localStorage.setItem('myToken',`${userToken}`)
        const userID = await fetch(`https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/me`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          }
        })
        const myID = await userID.json()
        console.log(await myID)
        this.myID = myID.id 
        this.myToken = userToken
      return this.rerout()
      } catch (error) {
        console.error('Error while logging in:', error)
        throw error
      }
      
      //await userLogin.json()
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
