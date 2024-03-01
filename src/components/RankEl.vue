<template>
  <li class="rankList_El" :class="{ rankList_me: props.aPlayer.userId == props.myID }">
    <span class="rankList_El_rank">{{ props.index + 1 }}</span>
    <img class="rankList_El_img" src="../assets/Icons/Profile-pic.png" alt=" " height="40px" width="40px"/>
    <span class="rankList_El_name">{{ props.aPlayer.name }}</span>
    <span class="rankList_El_score">{{ props.aPlayer.score }}</span>
  </li>
</template>

<script setup>
const props = defineProps({
  aPlayer: Object,
  index: Number,
  myID: Number
})
</script>

<style scoped></style>
