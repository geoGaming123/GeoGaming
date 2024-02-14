<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import SearchBar from '@/components/SearchBar.vue';
import GameList from '@/components/GameList.vue';

</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
      <hr>
      <GameList></GameList>
      <hr>
    <FooterComp></FooterComp>
  </main>
</template>
<style scoped>

</style>