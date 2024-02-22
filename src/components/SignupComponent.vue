<script setup>
import { RouterLink } from 'vue-router';
import { useUserStore } from '../stores/user'
import { ref } from 'vue';


const userStore = useUserStore()

/*
const formData = new FormData(userInfo)
      // Make your API request to create a new user
const response = await fetch('https://cepegra-frontend.xyz/wf11-atelier/wp-json/wp/v2/utilisateur', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
          'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2NlcGVncmEtZnJvbnRlbmQueHl6L3dmMTEtYXRlbGllciIsImlhdCI6MTcwNzk5MDE5NSwibmJmIjoxNzA3OTkwMTk1LCJleHAiOjE3MDg1OTQ5OTUsImRhdGEiOnsidXNlciI6eyJpZCI6IjEifX19.fgYfqHYmhNdFnW0xOoL2pY1HBsBCgThfi-6sy2ti-FQ'
        },
        body: formData
      })
      // Example: await fetch('/api/users', { method: 'POST', body: userData });
      console.log(await response.json());
*/
</script>

<template>
  <h1>Créer un compte</h1>

  <div class="card">
    <form action="" method="post" class="loginForm" @submit.prevent="handleSubmit">
      <label for="email">Email :</label>
      <input v-model="email" type="text" name="email" id="email" class="loginInput" placeholder="exemple@email.com">
      <label for="password">Mot de passe :</label>
      <input v-model="password" type="password" name="password" id="password" class="loginInput" placeholder="******">
      <label for="pseudoName">Pseudo :</label>
      <input v-model="pseudoName" type="text" name="pseudoName" id="pseudoName" class="loginInput" placeholder="Username">
      <label for="avatarFile">Avatar :</label>
      <input type="file" name="avatarFile" id="avatarFile" class="loginInput">
      <button class="loginBtn">Envoyer</button>
    </form>
    <a to="#" class="createAccount">Déjà un compte ?</a>
  </div>
</template>

<style scoped>
.loginForm {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  gap: 0.6em;
}

.loginBtn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #00D1C5;
  color: white;
  cursor: pointer;
}
.createAccount {
  color: #;
}
.loginInput {
  background-color: #FAFAFA; 
  border: #EEEEEE solid 1px;
  border-radius: 8px;
  padding: 0.4em 1.2em;
}
</style>
