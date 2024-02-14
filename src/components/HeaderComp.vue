<template>
  <section class="header">
    <div class="header-logo" :class="{ hidden : showLogo }">
      Logo
    </div>
    <div class="header-return" :class="{ hidden : !showLogo}">
      <button @click="lastPage">Return</button>
    </div>
    <div class="header-profile">
      <button @click="showProfile">Mon Profil</button>
      <div id="profileWindow" class="myprofile ">
        <img src="" alt="Photo"><br>
        <router-link to="/profile">Modifier le profil</router-link>
        <button @click="disconnect">Déconnexion</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineProps, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const props = defineProps({
  data: String
})

const router = useRouter()
const showLogo = computed(() => {
  return props.data === "logo" ? false : true
})

const lastPage = () => {
  console.log("Page précédente")
}

const showProfile = () => {
  document.getElementById('profileWindow').classList.toggle('hidden')
}

const disconnect = () => {
  console.log("Déconnecté")
}

</script>

<style scoped>
.myprofile {
  position: absolute;
  top: 84px; /* Set to 60 (header height) */
  right: 0;
  height: 300px;
  width: 200px;
  background-color: #f1f1f190;
  padding: 1rem;
  border: 1px solid black;
  
}
.header {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #f1f1f1;
  padding: 1rem;
  justify-content: space-between;
}
.hidden {
  display: none;
}

</style>