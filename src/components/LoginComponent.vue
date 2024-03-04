<script setup>
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';

const userStore = useUserStore()

//const username = ref('')
//const password = ref('')

/*const loginAction = () => {
  userStore.setUserLogin(username.value, password.value)
  username.value = ""
  password.value = ""
  userStore.loginUser()
}*/
</script>

<template>
  <div class="logo">
    <img src="../assets/Icons/Logo-perso-bleu.png" height="100px" alt="">
    <h1>Connexion</h1>
  </div>

  <div class="card">
    <form action="" method="post" class="loginForm" @submit.prevent="userStore.loginUser">
      <input v-model="userStore.userData.username" type="text" name="username" id="username" class="loginInput" placeholder="Pseudo">
      <input v-model="userStore.userData.password" type="password" name="password" id="password" class="loginInput" placeholder="Mot de passe">
      <button class="loginBtn">Connexion</button>
      <p class="login--separation"><span>Pas de compte ?</span></p>
      <button href="#" @click.prevent="userStore.pageBool = !userStore.pageBool" class="login--btn">Créer un compte</button>
    </form>
  </div>
  
</template>

<style scoped>

</style>
