<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user'

const userStore = useUserStore()

 const username = ref('')
 const email = ref('')
 const password = ref('')


const signUpAction = () => {
  userStore.setUserData(username.value, email.value, password.value)
  username.value = ""
  email.value = ""
  password.value = ""
  userStore.createUser()
}
</script>

<template>
  <div class="logo">
    <img src="../assets/Icons/Logo-perso-bleu.png" height="100px" alt="">
    <h1>Créer un compte</h1>
  </div>

  <div class="card">
    <form action="" method="" class="loginForm" @submit.prevent="signUpAction">
      <input v-model="email" type="text" name="email" id="email" class="loginInput" :class="{ errorclass: userStore.onError}" placeholder="exemple@email.com">
      <input v-model="username" type="text" name="pseudoName" id="pseudoName" class="loginInput" :class="{ errorclass: userStore.onError}" placeholder="Pseudo">
      <input v-model="password" type="password" name="password" id="password" class="loginInput" :class="{ errorclass: userStore.onError}" placeholder="Mot de passe">
      <input @change="userStore.onFileUpload" type="file" name="avatarFile" id="avatarFile" class="loginInput" :class="{ errorclass: userStore.onError}" />
      <button class="loginBtn">Envoyer</button>
      <p class="login--separation"><span>Vous avez déjà un compte ?</span></p>
      <button href="#" @click.prevent="userStore.pageBool = !userStore.pageBool" class="login--btn">Je me connecte</button>
    </form>
    <div v-if="userStore.onError" class="errorcontainer errorclass">
    <h1>❌</h1>
    <p>Erreur: une erreur est survenue, veuillez réessayer s'il vous plâit.</p>
  </div>
  </div>
  
</template>

<style scoped>
.errorcontainer {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-top: 1.5rem;
  border: 1.5px solid;
}
.errorclass {
  color: red;
  border-color: red;
  border-radius: 8px;
  padding: 1rem;
}
</style>
