<template>
  <tbody class="gameListId">
    <GameListItem v-for="(match, index) in Matches" :key="index" :aMatch="match" :title="title"></GameListItem>
  </tbody>
</template>

<script setup>
import GameListItem from './GameListItem.vue';

const props = defineProps({
  Matches: Array,
  title: String
})

</script>

<style scoped>

</style>