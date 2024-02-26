<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <h1>Connexion</h1>

  <div class="card">
    <form action="" method="post" class="loginForm">
      <label for="email">Email :</label>
      <input type="text" name="email" id="email" class="loginInput" placeholder="exemple@email.com">
      <label for="password">Mot de passe :</label>
      <input type="password" name="password" id="password" class="loginInput" placeholder="******">
      <RouterLink to="/dash"><button class="loginBtn">Connexion</button></RouterLink>
    </form>
    <p>Vous n'avez pas de compte?<a class="createAccount">Créez en un</a></p>
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
