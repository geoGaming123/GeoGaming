<script setup>
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
</script>

<template>
  <div class="logo">
    <img src="../assets/Icons/Logo-perso-bleu.png" height="100px" alt="">
  </div>
  <h1>Créer un compte</h1>

  <div class="card">
    <form action="" method="" class="loginForm" @submit.prevent="userStore.createUser">
      <label for="email">Email :</label>
      <input v-model="userStore.userData.email" type="text" name="email" id="email" class="loginInput" placeholder="exemple@email.com">
      <label for="pseudoName">Pseudo :</label>
      <input v-model="userStore.userData.username" type="text" name="pseudoName" id="pseudoName" class="loginInput" placeholder="Username">
      <label for="password">Mot de passe :</label>
      <input v-model="userStore.userData.password" type="password" name="password" id="password" class="loginInput" placeholder="******">
      <label for="avatarFile">Avatar :</label>
      <input @change="userStore.onFileUpload" type="file" name="avatarFile" id="avatarFile" class="loginInput" />
      <button class="loginBtn">Envoyer</button>
    </form>
    <p>Vous avez déjà un compte ?<br><a @click.prevent="userStore.pageBool = !userStore.pageBool" class="createAccount">Se connecter</a></p>
  </div>
</template>

<style scoped>

</style>
