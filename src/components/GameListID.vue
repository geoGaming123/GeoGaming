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
    <tr class="gamelist-item empty" v-if="tab === 'created' && Matches.length === 0">
      <td></td>
      <td>Aucune partie créée :c</td>
      <td></td>
  </tr>
    <tr class="gamelist-item empty" v-if="tab === 'available' && Matches.length === 0">
      <td></td>
      <td>Aucune partie disponible :c</td>
      <td></td>
  </tr>
    <tr class="gamelist-item empty" v-if="tab === 'joined' && Matches.length === 0">
      <td></td>
      <td>Aucune partie rejointe :c</td>
      <td></td>
  </tr>
  </tbody>
</template>

<script setup>
import GameListItem from './GameListItem.vue'

const props = defineProps({
  Matches: Array,
  title: String,
  tab: String,
  myID: Number
})
</script>

<style scoped></style>
