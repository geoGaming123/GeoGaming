<template>
  <div>
    <button @click="confirmDelete">supprimer</button>
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games';
import { useRouter } from 'vue-router'


const { id } = defineProps(['id']);
const gamesStore = useGamesStore();
const router = useRouter()

const confirmDelete = async () => {
  const userConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette partie ?');

  if (userConfirmed) {
    try {
      await gamesStore.deleteGame(id);
      // Ajoutez toute logique ou navigation supplémentaire après la suppression réussie du jeu
      // Naviguer en arrière dans l'historique du routeur
      router.go(-1);
    } catch (error) {
      console.error('Erreur lors de la suppression du jeu :', error);
      // Ajoutez une logique de gestion des erreurs si nécessaire
    }
  }
};
</script>
