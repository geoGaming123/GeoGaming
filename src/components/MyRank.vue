<template>
  <div class="myRank">
    <img src="" alt="Ma_photo" /><span class="myRank_pseudo">{{ myName }}</span>
    <div class="myRank_Stat">
      <span>{{ props.myRankNumber }}/{{ props.players }}</span><span>{{ props.rank.score }}</span>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user';

const props = defineProps({
  rank: Object,
  myRankNumber: Number,
  players: Number
})

const userStore = useUserStore()
const myName = userStore.userData.acf.pseudo

</script>

<style scoped></style>
