<template>
  <section class="header" :class="{ header_white: props.color == 'white' }">
    <div class="header_logo" :class="{ hidden: showLogo }">
      <img v-if="props.color != 'white'" src="../assets/Icons/Logo-texte-blanc.png" alt="Logo*" />
      <img v-if="props.color == 'white'" src="../assets/Icons/Logo-texte-bleu.png" alt="Logo*" />
    </div>
    <div class="header_return" :class="{ hidden: !showLogo }">
      <button @click="lastPage"><img src="../assets/Icons/logout-white.png" alt="Return" width="30px"></button>
    </div>
    <div class="header_profile" :class="{ hidden: showProfileBtn }">
      <img src="../assets/Icons/Profile-pic.png" alt="" @click="showProfileWindow" />
      <div id="profileWindow" class="header_myprofile hidden">
        <img class="rankList_El_img" :src="userStore.userimglink" width="50" alt="Photo" /> {{ myInfo }}<br />
        <router-link to="/dash">Mon profil</router-link><br />
        <router-link to="/help">Besoin d'aide ?</router-link>
        <button @click="disconnect">Déconnexion</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user';

const props = defineProps({
  data: String,
  profile: String,
  color: String
})

const userStore = useUserStore()
const myInfo = computed(() => userStore.userLogin.username)
const router = useRouter()

const showLogo = computed(() => {
  return props.data === 'logo' ? false : true
})
const showProfileBtn = computed(() => {
  return props.profile === 'profile' ? false : true
})

const lastPage = () => {
  router.go(-1)
}

const showProfileWindow = () => {
  document.getElementById('profileWindow').classList.toggle('hidden')
}

const disconnect = () => {
  if(confirm('Voulez-vous vraiment vous déconnecter ?')){
    router.push('/')
  }
}
</script>

<style scoped></style>
