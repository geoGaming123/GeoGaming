<template>
  <tbody class="gameListId">
    <GameListItem
      v-for="(match, index) in props.Matches"
      :key="index"
      :aMatch="match"
      :myID="myID"
      :title="title"
      :tab="tab"
    ></GameListItem>
  </tbody>
</template>

<script setup>
import GameListItem from './GameListItem.vue'

const props = defineProps({
  Matches: Array,
  title: String,
  tab: String,
  myID: String
})
</script>

<style scoped></style>
