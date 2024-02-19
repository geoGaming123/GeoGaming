<template>
  <main>
    <HeaderComp data="logo" profile="profile"></HeaderComp>
    <GameList :MatchesData="PastMatchesData" v-show="showMenuData == 'past'" :menu="showMenuData"></GameList>
    <GameList :MatchesData="PresentMatchesData" v-show="showMenuData == 'present'" :menu="showMenuData"></GameList>
    <GameList :MatchesData="FutureMatchesData" v-show="showMenuData == 'futur'" :menu="showMenuData"></GameList>
    <FooterComp @activate-menu="showMenu"></FooterComp>
  </main>
</template>


<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import GameList from '@/components/GameList.vue';
import { ref, computed } from 'vue';
import { useCounterStore } from '@/stores/counter'

const monStore = useCounterStore()
monStore.getAllMatches(); // Charge les données des parties et distribue en 3 array selon la temporalité

const showMenuData = ref('present')
const showMenu = (tab) => {
  showMenuData.value = tab
}
const FutureMatchesData = computed(() => { // Récupère le tableau des parties futures
  return monStore.getMatchesFuture
})
const PastMatchesData = computed(() => { // Récupère le tableau des parties passées
  return monStore.getMatchesPast
})
const PresentMatchesData = computed(() => { // Récupère le tableau des parties en cours
  return monStore.getMatchesPresent
})

</script>


<style scoped>

</style>