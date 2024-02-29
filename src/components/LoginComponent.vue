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
    <p>Vous n'avez pas de compte?<a href="#" @click.prevent="userStore.pageBool = !userStore.pageBool" class="createAccount">Créez en un</a></p>
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
  background-color: #00d1c5;
  color: white;
  cursor: pointer;
}
.createAccount {
  color: #00d1c5;
}
.loginInput {
  background-color: #fafafa;
  border: #eeeeee solid 1px;
  border-radius: 8px;
  padding: 0.4em 1.2em;
}
</style>
