<template>
    <button @click="confirmDelete">supprimer</button>
</template>

<script setup>
import { useGamesStore } from '@/stores/games'
import { useRouter } from 'vue-router'

const { id } = defineProps(['id'])
const gamesStore = useGamesStore()
const router = useRouter()

const confirmDelete = async () => {
  const userConfirmed = window.confirm('Êtes-vous sûr de vouloir supprimer cette partie ?')

  if (userConfirmed) {
    try {
      await gamesStore.deleteGame(id)
      router.go(-1)
      alert('votre partie à été supprimé')
    } catch (error) {
      console.error('Erreur lors de la suppression du jeu :', error)
    }
  }
}
</script>
