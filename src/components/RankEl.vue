<template>
      <li class="rankList_El" :class="{ rankList_first: props.index === 0 }">
        <span>{{ props.index + 1}}</span>
        <img class="rankList_El_center" src="" alt=" ">
        <span>{{ props.aPlayer.name }}</span>
        <span class="rankList_El_right">{{ props.aPlayer.time }}</span>
      </li>
</template>

<script setup>


const props = defineProps({
  aPlayer: Object,
  index: Number
})
</script>

<style scoped>

</style>