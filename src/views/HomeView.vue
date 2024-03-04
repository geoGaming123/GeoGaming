<template>
  <main>
    <HeaderComp data="logo" profile="profile" color="white"></HeaderComp>
    <NavComp @activateNav="showMenu"></NavComp>
    <GameList
      title="past"
      :MatchesData="PastMatchesData"
      v-if="showMenuData == 'past'"
      :myID="myID"
      :menu="showMenuData"
    ></GameList>
    <GameList
      title="present"
      :MatchesData="PresentMatchesData"
      v-if="showMenuData == 'present'"
      :myID="myID"
      :menu="showMenuData"
    ></GameList>
    <GameList
      title="futur"
      :MatchesData="FutureMatchesData"
      v-if="showMenuData == 'futur'"
      :myID="myID"
      :menu="showMenuData"
    ></GameList>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import NavComp from '@/components/NavComp.vue'
import GameList from '@/components/GameList.vue'
import { ref, computed } from 'vue'
import { useDataStore } from '@/stores/data'
import { useUserStore } from '@/stores/user'

const dataStore = useDataStore()
dataStore.getAllMatches() // Charge les données des parties et distribue en 3 array selon la temporalité
const userStore = useUserStore()
const myID = computed(() => userStore.myID)  // Récupère l'id de l'user connecté

setTimeout(() => {
  console.log('HomeView - ID - ' + myID.value)
}, 3000)

const showMenuData = ref('present') // Nav à afficher par défaut

const showMenu = (tab) => { //Recois "tab" du footer pour savoir le menu actif
  showMenuData.value = tab
  dataStore.getAllMatches()
}
const FutureMatchesData = computed(() => { // Récupère le tableau des parties futures
  return dataStore.getMatchesFuture
})
const PastMatchesData = computed(() => { // Récupère le tableau des parties passées
  return dataStore.getMatchesPast
})
const PresentMatchesData = computed(() => { // Récupère le tableau des parties en cours
  return dataStore.getMatchesPresent
})
</script>

<style scoped></style>