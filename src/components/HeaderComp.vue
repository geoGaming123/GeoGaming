<template>
  <section class="header">
    <div class="header_logo" :class="{ hidden : showLogo }">
      <img src="../assets/Icons/Logo-texte-blanc.png" alt="Logo*">
    </div>
    <div class="header_return" :class="{ hidden : !showLogo}">
      <button @click="lastPage">Return</button>
    </div>
    <div class="header_profile" :class="{ hidden : showProfileBtn}">
      <img src="../assets/Icons/Profile-pic.png" alt="" @click="showProfileWindow">
      <div id="profileWindow" class="header_myprofile hidden">
        <img src="" alt="Photo"><br>
        <router-link to="/profile">Modifier le profil</router-link><br>
        <router-link to="/help">Besoin d'aide ?</router-link>
        <router-link to="/"><button @click="disconnect">Déconnexion</button></router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  data: String,
  profile: String
})

const router = useRouter()

const showLogo = computed(() => {
  return props.data === "logo" ? false : true
})
const showProfileBtn = computed(() => {
  return props.profile === "profile" ? false : true
})

const lastPage = () => {
  router.go(-1);
}

const showProfileWindow = () => {
  document.getElementById('profileWindow').classList.toggle('hidden')
}

const disconnect = () => {
  console.log("Déconnecté")
}

</script>

<style scoped>

</style>