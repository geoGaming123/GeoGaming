<script setup>
import { useUserStore } from '@/stores/user';

const userStore = useUserStore()
</script>

<template>
  <h1>Connexion</h1>

  <div class="card">
    <form action="" method="post" class="loginForm" @submit.prevent="userStore.loginUser">
      <label for="username">Username :</label>
      <input v-model="userStore.userLogin.username" type="text" name="username" id="username" class="loginInput" placeholder="exemple@email.com">
      <label for="password">Mot de passe :</label>
      <input v-model="userStore.userLogin.password" type="password" name="password" id="password" class="loginInput" placeholder="******">
      <button class="loginBtn">Connexion</button>
    </form>
    <p>Vous n'avez pas de compte ?<br><a href="#" @click.prevent="userStore.pageBool = !userStore.pageBool" class="createAccount">Créez en un</a></p>
  </div>
</template>

<style scoped>

</style>
