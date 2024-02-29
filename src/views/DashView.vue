<template>
  <main class="dashboard">
    <HeaderComp data="logo"></HeaderComp>
    <div class="dashboard-content">
      <p>{{ myInfo }}</p>
      <div class="dashboard-content-circle"><img src="" alt="ProfilePic" /></div>
      <button class="dashboard-content-btn" @click="sendToHome">
        <img src="../assets/Icons/Logo-perso-blanc.png" alt="BTN" height="40px" width="40px" />
      </button>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { useGamesStore } from '@/stores/games';
import { computed } from 'vue'


const monStore = useCounterStore()
const gamesStore = useGamesStore()

const router = useRouter()
const sendToHome = () => {
  router.push(`/home`)
}
   gamesStore.getuserId
   gamesStore.getUserName
   gamesStore.getUserToken


</script>
