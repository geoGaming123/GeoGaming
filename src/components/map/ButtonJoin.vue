<!-- Gamedelete.vue -->

<template>
    <div>
      <button @click="joinGame">rejoindre</button>
    </div>
  </template>
  
  <script setup>
  import { useGamesStore } from '@/stores/games';
  const { id } = defineProps(['id']);
  const gamesStore = useGamesStore();
  const userId = 999;
  
  const joinGame = async () => {
    try {
      await gamesStore.joinGame(id, userId);
      // Ajoutez toute logique supplémentaire ou navigation après avoir rejoint le jeu avec succès
    } catch (error) {
      console.error('Error joining game:', error);
      // Ajoutez une logique de gestion des erreurs si nécessaire
    }
  };
  </script>
  