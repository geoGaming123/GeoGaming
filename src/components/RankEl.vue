<template>
  <li class="rankList_El" :class="{ rankList_me: props.aPlayer.userId == props.myID }">
    <span>{{ props.index + 1 }}</span>
    <img class="rankList_El_center" src="" alt=" " />
    <span>{{ props.aPlayer.name }}</span>
    <span class="rankList_El_right">{{ props.aPlayer.score }}</span>
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
