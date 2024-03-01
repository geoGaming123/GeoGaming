<template>
  <div class="myRank">
    <img class="rankList_El_img" :src="userStore.userimglink" width="100" alt="Ma_photo" /><span class="myRank_pseudo">{{ myName }}</span>
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
const myName = userStore.userLogin.username

</script>

<style scoped></style>
