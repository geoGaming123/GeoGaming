<!-- Gamedelete.vue -->

<template>
    <div>
      <button @click="deleteGame">supprimer</button>
    </div>
  </template>
  
  <script setup>
  import { useGamesStore } from '@/stores/games';
  const { id } = defineProps(['id']);
  const gamesStore = useGamesStore();
  
  const deleteGame = async () => {
    try {
      await gamesStore.deleteGame(id);
      // Add any additional logic or navigation after successfully deleting the game
    } catch (error) {
      console.error('Error deleting game:', error);
      // Add error handling logic if needed
    }
  };
  </script>
  