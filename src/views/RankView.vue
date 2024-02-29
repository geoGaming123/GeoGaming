<template>
  <main>
    <HeaderComp></HeaderComp>
    <MyRank v-for="(rank, index) in myRank" :key="index" :rank="rank" :myRankNumber="myRankNumber" :players="totalPlayers"></MyRank>
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
import { computed, ref } from 'vue'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

const getIdFromUrl = () => {
  // Récupère l'id de l'url
  const pathComponents = window.location.href.split('/')
  const id = pathComponents[pathComponents.length - 1]
  return id
}
const monStore = useCounterStore()
const userStore = useUserStore()
monStore.getAMatch(getIdFromUrl()) // Va chercher le match correspondant à l'id de l'url

const myID = computed(() => userStore.myID)
const playersToRank = computed(() => monStore.getMatchToRank)
const ranking = computed(()=>playersToRank.value.slice().sort((a, b) => a.score - b.score))
const totalPlayers = computed(()=>playersToRank.value.length)
const myRank = computed(() => playersToRank.value.filter(i => i.userId == myID.value))
const myRankNumber = computed(()=>ranking.value.findIndex(i => i.userId == myID.value) + 1)
setTimeout(()=>{
  console.log("myIDDD - " + myID.value)
  console.log("myRANK - " + totalPlayers.value)
},2000)
</script>

<style scoped></style>
