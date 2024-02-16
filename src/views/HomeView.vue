<template>
  <main>
    <HeaderComp data="logo" profile="profile"></HeaderComp>
    <GameList :menu="showMenuData"></GameList>
    <FooterComp @activate-menu="showMenu"></FooterComp>
  </main>
</template>


<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import FooterComp from '@/components/FooterComp.vue';
import GameList from '@/components/GameList.vue';
import { ref } from 'vue';

const showMenuData = ref('present')
const showMenu = (tab) => {
  showMenuData.value = tab
}

</script>


<style scoped>

</style>