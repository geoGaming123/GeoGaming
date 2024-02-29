<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <h1>Créer un compte</h1>

  <div class="card">
    <form action="" method="" class="loginForm" @submit.prevent="userStore.createUser">
      <label for="email">Email :</label>
      <input v-model="userStore.userData.email" type="text" name="email" id="email" class="loginInput" placeholder="exemple@email.com">
      <label for="password">Mot de passe :</label>
      <input v-model="userStore.userData.password" type="password" name="password" id="password" class="loginInput" placeholder="******">
      <label for="pseudoName">Pseudo :</label>
      <input v-model="userStore.userData.username" type="text" name="pseudoName" id="pseudoName" class="loginInput" placeholder="Username">
      <label for="avatarFile">Avatar :</label>
      <input type="file" name="avatarFile" id="avatarFile" class="loginInput">
      <button class="loginBtn">Envoyer</button>
    </form>
    <a @click.prevent="userStore.pageBool = !userStore.pageBool" class="createAccount">Déjà un compte ?</a>
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
  color: #00D1C5;
}
.loginInput {
  background-color: #FAFAFA; 
  border: #EEEEEE solid 1px;
  border-radius: 8px;
  padding: 0.4em 1.2em;
}
</style>
