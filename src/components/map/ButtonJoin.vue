<template>
    <div>
      <button @click="joinGame">Rejoindre</button>
    </div>
  </template>
  
  <script setup>
  import { useGamesStore } from '@/stores/games';
  const { id } = defineProps(['id']);
  const gamesStore = useGamesStore();
  const userId = 999;
  
  const joinGame = async () => {
    try {
      const position = {
        latitude: "", // Replace with actual latitude
        longitude: "", // Replace with actual longitude
      };
  
      await gamesStore.joinGame(id, userId, position);
      console.log("envoi au store ");
    } catch (error) {
      console.error('Error joining game:', error);
      // Add error handling logic if needed
    }
  };
  </script>
  