<script setup>
import { RouterView } from 'vue-router'
import { useGamesStore } from './stores/games'
import { computed, onMounted } from 'vue'

const gamesStore = useGamesStore()

const matches = computed(() => {
  return gamesStore.allMatches
})

onMounted(() => {
  gamesStore
    .getMatches()
    .then(() => {
      console.log(matches.value)
    })
    .catch((error) => console.error('Error fetching matches:', error))
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
