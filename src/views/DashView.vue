<template>
  <main class="dashboard">
    <HeaderComp data="logo"></HeaderComp>
    <div class="dashboard-content">
      <p>{{ myInfo.name }}</p>
      <div class="dashboard-content-circle"><img :src="imglink" width="300" alt="ProfilePic" /></div>
      <button class="dashboard-content-btn" @click="sendToHome">
        <img src="../assets/Icons/Logo-perso-blanc.png" alt="BTN" height="40px" width="40px" />
      </button>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
//import { useGamesStore } from '@/stores/games';
import { useUserStore } from '@/stores/user'
import { computed } from 'vue'

const userStore = useUserStore()
const imglink = computed(() => userStore.userimglink)
const monStore = useCounterStore()
//const gameStore = useGamesStore()
const router = useRouter()
//const myID = computed(() => gameStore.sendUserId)
monStore.getUser(10)
const myInfo = computed(() => monStore.getMyUser)
const sendToHome = () => {
  router.push(`/home`)
}
</script>
