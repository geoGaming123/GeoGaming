<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import GameList from '@/components/GameList.vue';

</script>

<template>
  <main>
    <HeaderComp data="logo"></HeaderComp>
    <GameList></GameList>
    <FooterComp></FooterComp>
  </main>
</template>
<style scoped>

</style>