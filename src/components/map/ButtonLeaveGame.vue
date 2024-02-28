<template>
    <div>
      <button @click="confirmJoinGame"> Se désincrire</button>
    </div>
  </template>
  
  <script setup>
  import { useGamesStore } from '@/stores/games';
  import { useRouter } from 'vue-router'
  
  const { id } = defineProps(['id']);
  const gamesStore = useGamesStore();
  const router = useRouter()
  
  const confirmJoinGame = async () => {
    const confirmed = confirm("Êtes-vous sûr de vouloir vous désincrire le jeu ?");
    if (confirmed) {
      try {
        await gamesStore.leaveGame(id);
        router.go(-1);
        alert('vous vous etes bien désincris de la partie');
      } catch (error) {
        console.error('Error joining game:', error);
        // Ajoutez la logique de gestion des erreurs si nécessaire
      }
    }
  };
  </script>
  