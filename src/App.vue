<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">

      <nav class="test">
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/home">Home</RouterLink>git me
        <RouterLink to="/gameform">MapForm</RouterLink>
        <RouterLink to="/gameformmodif">MapFormmodif</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>

</style>
