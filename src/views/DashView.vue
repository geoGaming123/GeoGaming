<template>
  <main class="dashboard">
    <HeaderComp data="logo"></HeaderComp>
    <div class="dashboard-content">
      <p>{{ myInfo.acf.pseudo }}</p>
      <div class="dashboard-content-circle"><img src="" alt="ProfilePic"></div>
      <button class="dashboard-content-btn" @click="sendToHome">
        <img src="../assets/Icons/Logo-perso-blanc.png" alt="BTN" height="40px" width="40px">
      </button>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import { useRouter } from 'vue-router'
import { useCounterStore } from '@/stores/counter';
import { computed } from 'vue';

const monStore = useCounterStore()
const router = useRouter()
const myID = 9
monStore.getUser(myID)
const myInfo = computed(()=>monStore.getMyUser)
const sendToHome = () => {
  router.push(`/home`)
}
</script>