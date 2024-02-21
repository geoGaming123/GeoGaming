<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useGamesStore } from './stores/games';
import { computed, onMounted } from 'vue';

const gamesStore = useGamesStore()


const matches = (computed(() => {
  return gamesStore.allMatches
}))

onMounted(() => {
  gamesStore.getMatches()
    .then(() => {
      console.log(matches.value);
    })
    .catch(error => console.error('Error fetching matches:', error));
});




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
