<template>
  <tbody class="gameListId">
    <GameListItem v-for="(match, index) in Matches" :key="index" :aMatch="match"></GameListItem>
  </tbody>
</template>

<script setup>
import GameListItem from './GameListItem.vue';

const props = defineProps({
  Matches: Array
})

console.log('plss - ' + props.Matches)

</script>

<style scoped>

</style>