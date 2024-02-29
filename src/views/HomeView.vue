<template>
  <main>
    <HeaderComp data="logo" profile="profile" color="white"></HeaderComp>
    <NavComp @activateNav="showMenu"></NavComp>
    <GameList
      title="past"
      :MatchesData="PastMatchesData"
      v-show="showMenuData == 'past'"
      :myID="myID"
      :menu="showMenuData"
    ></GameList>
    <GameList
      title="present"
      :MatchesData="PresentMatchesData"
      v-show="showMenuData == 'present'"
      :myID="myID"
      :menu="showMenuData"
    ></GameList>
    <GameList
      title="futur"
      :MatchesData="FutureMatchesData"
      v-show="showMenuData == 'futur'"
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
import { useCounterStore } from '@/stores/counter'
import { useGamesStore } from '@/stores/games'

const monStore = useCounterStore()
monStore.getAllMatches() // Charge les données des parties et distribue en 3 array selon la temporalité
const gameStore = useGamesStore()
const myID = computed(() => gameStore.sendUserId)
setTimeout(() => {
  console.log('HomeV - ID - ' + myID.value)
}, 3000)
setTimeout(() => {
  console.log(myID.value)
}, 2000)

const showMenuData = ref('present')
const showMenu = (tab) => {
  //Recois "tab" du footer pour savoir le menu actif
  showMenuData.value = tab
}
const FutureMatchesData = computed(() => {
  // Récupère le tableau des parties futures
  return monStore.getMatchesFuture
})
const PastMatchesData = computed(() => {
  // Récupère le tableau des parties passées
  return monStore.getMatchesPast
})
const PresentMatchesData = computed(() => {
  // Récupère le tableau des parties en cours
  return monStore.getMatchesPresent
})
</script>

<style scoped></style>
