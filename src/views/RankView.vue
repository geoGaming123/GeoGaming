<template>
  <main>
    <HeaderComp></HeaderComp>
    <MyRank v-for="(rank, index) in myRank" :key="index" :rank="rank"></MyRank>
    <ul class="rankList">
      <RankEl
        v-for="(player, index) in playersToRank"
        :key="index"
        :aPlayer="player"
        :index="index"
      ></RankEl>
    </ul>
  </main>
</template>

<script setup>
import HeaderComp from '@/components/HeaderComp.vue'
import MyRank from '@/components/MyRank.vue'
import RankEl from '@/components/RankEl.vue'
import { computed } from 'vue'
import { useCounterStore } from '@/stores/counter'

const getIdFromUrl = () => {
  // Récupère l'id de l'url
  const pathComponents = window.location.href.split('/')
  const id = pathComponents[pathComponents.length - 1]
  return id
}
const myID = 9
const monStore = useCounterStore()
monStore.getAMatch(getIdFromUrl()) // Va chercher le match correspondant à l'id de l'url

const playersToRank = computed(() => monStore.getMatchToRank)
const myRank = computed(() => playersToRank.value.filter((player) => player.userId == myID))
</script>

<style scoped></style>
