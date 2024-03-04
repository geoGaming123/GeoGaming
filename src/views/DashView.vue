<template>
  <main class="dashboard">
    <HeaderComp data="logo"></HeaderComp>
    <div class="dashboard-content">
      <p>{{ myInfo }}</p>
      <div v-if="imglink != ''" class="dashboard-content-circle"><img :src="imglink" width="300" alt="ProfilePicDl" /></div>
      <div v-else class="dashboard-content-circle"><img src="../assets/Icons/Profile-pic.png" alt="ProfilePicAuto" /></div>
      <div class="modifProfile">
        <button @click="sendToProfile"><img src="../assets/Icons/stylus.png" alt=""></button>
      </div>
      <button class="dashboard-content-btn" @click="sendToHome">
        <img src="../assets/Icons/Logo-perso-blanc.png" alt="BTN" height="40px" width="40px" />
      </button>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { useRouter } from 'vue-router'
import { useGamesStore } from '@/stores/games';
import { useUserStore } from '@/stores/user'
import { computed, onMounted } from 'vue'

const userStore = useUserStore()
const imglink = computed(() => userStore.userimglink)
const gamesStore = useGamesStore()
const router = useRouter()
const myInfo = computed(() => userStore.userLogin.username) // Récupère le pseudo de l'user connecté

const sendToHome = () => {  // Envoie l'user vers HomeView
router.push(`/home`)
}
const sendToProfile = () => {  // Envoie l'user vers Edit Profile
router.push(`/profile`)
}

const matches = computed(() => {
  return gamesStore.allMatches
})
gamesStore.getuserId // Envoie les données de l'user vers gamesStore
gamesStore.getUserName
gamesStore.getUserToken

onMounted(() => {
  gamesStore
  .getMatches()
  .then(() => {
    console.log(matches.value)
  })
  .catch((error) => console.error('Error fetching matches:', error))
})

</script>
