<template>
  <main class="dashboard">
    <HeaderComp data="logo"></HeaderComp>
    <div class="dashboard-content">
      <div class="dashboard-content-circle">:-)</div>
      <button class="dashboard-content-btn" @click="sendToHome">
        <img src="../assets/Icons/Logo-perso-blanc.png" alt="BTN" height="40px" width="40px">
      </button>
    </div>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import { useRouter } from 'vue-router'

const router = useRouter()

const sendToHome = () => {
  router.push(`/home`)
}

</script>