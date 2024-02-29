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
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user';
import { computed } from 'vue'

const monStore = useCounterStore()
const userStore = useUserStore()
const router = useRouter()
const myInfo = computed(() => userStore.userData.acf.pseudo)
const sendToHome = () => {
  router.push(`/home`)
}
</script>
