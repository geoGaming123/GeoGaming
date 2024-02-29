<template>
  <div>
    <button @click="confirmJoinGame">Rejoindre</button>
  </div>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { useRouter } from 'vue-router'

const { id } = defineProps(['id'])
const gamesStore = useGamesStore()
const router = useRouter()

const confirmJoinGame = async () => {
  const confirmed = confirm('Êtes-vous sûr de vouloir rejoindre le jeu ?')
  if (confirmed) {
    try {
      await gamesStore.joinGame(id)
      router.go(-1)
      alert('vous avez rejoint la partie')
    } catch (error) {
      console.error('Error joining game:', error)
      // Ajoutez la logique de gestion des erreurs si nécessaire
    }
  }
}
</script>
