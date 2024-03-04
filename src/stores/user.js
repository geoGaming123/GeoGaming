import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // Define state properties here if needed
    loggedin: true,
    admintoken:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwOTEyODE1MiwibmJmIjoxNzA5MTI4MTUyLCJleHAiOjE3MDk3MzI5NTIsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.WvWfzVTkalj9yAFVkbMrXREJKrwR61EWEU8xqYfHb7M',
    myID: ref(''),
    myToken: ref(''),
    pageBool: ref(false),
    userData: {
      username: ref(''),
      email: ref(''),
      password: ref(''),
      avatar: ref()
    },
    userLogin: {
      username: ref(''),
      password: ref('')
    },
    userimglink: ref('')
  }),
  getters: {
   /* username() {
      return (this.userData.acf.pseudo = this.userData.username)
    }*/
  },
  actions: {
    rerout() {
      this.$router.push({ path: '/dash' })
    },
    onFileUpload(e) {
      this.userData.avatar = e.target.files[0]
    },
    async userDashImage() {
      const getmyimage = await fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.myToken}`
        }
      })
      const getmyimageresult = await getmyimage.json() 
      // console.log(getmyimageresult)
      this.userimglink = getmyimageresult.acf.avatar
    },
    // Methods to interact with user data

    async createUser() {
      try {
        const form = new FormData()
        form.append('username', this.userData.username)
        form.append('email', this.userData.email)
        form.append('password', this.userData.password)
        form.append('file', this.userData.avatar)

        const basicAuth = btoa('admin' + ':' + 'Yh2V sfDi 7Pek 2qMo rBb7 4tIu')

        const userSignUp = await fetch(
          'https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users',
          {
            method: 'POST',
            headers: {
              Authorization: `Basic ${basicAuth}`
            },
            body: form
          }
        )
        // console.log('userSignup:', userSignUp.status)

        const getUserToken = await fetch(
          'https://cepegra-frontend.xyz/wf11-atelier/wp-json/jwt-auth/v1/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: `${this.userData.username}`,
              password: `${this.userData.password}`
            })
          }
        )
        // console.log(getUserToken)
        const thisToken = await getUserToken.json()

        const postUserImage = await fetch(
          'https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/media',
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${thisToken.token}`
            },
            body: form
          }
        )
        const postUserImageResponse = await postUserImage.json()
        const postUserImageLink = postUserImageResponse.link

        // console.log('postUserImage:', postUserImage.status, await postUserImageLink)
        const patchUserImage = await fetch(
          'https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/me',
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${thisToken.token}`
            },
            body: JSON.stringify({ fields: { avatar: `${postUserImageResponse.link}` } })
          }
        )
        // console.log('patchUserImage:', patchUserImage.status)
      } catch (error) {
        throw new Error('Failed to create new user', error)
      }
    },
    async loginUser() {
      try {
        const userLoginData = await fetch(
          'https://cepegra-frontend.xyz/wf11-atelier/wp-json/jwt-auth/v1/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.userLogin)
          }
        )

        if (!userLoginData.ok) {
          throw new Error('Failed to login')
        }

        const userLoginInfo = await userLoginData.json()
        const userToken = userLoginInfo.token
        // console.log(await userLoginInfo)
        
        const userID = await fetch(
          `https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/users/me`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userToken}`
            }
          }
        )
        const myID = await userID.json()
        // console.log(await myID)
        this.myID = myID.id
        this.myToken = userToken
        return this.rerout(), this.userDashImage()
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
