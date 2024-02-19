<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import MyRank from '@/components/MyRank.vue';
</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
    <MyRank></MyRank>
    <ul class="rankList">
      <li class="rankList_El rankList_first">
        <span>1</span>
        <img class="rankList_El_center" src="" alt=" ">
        <span>monsuper.pseudo</span>
        <span class="rankList_El_right">3m 57s</span>
      </li>
      <li class="rankList_El">
        <span>2</span>
        <img class="rankList_El_center" src="" alt=" ">
        <span>jean</span>
        <span class="rankList_El_right">4m 02s</span>
      </li>
      <li class="rankList_El">
        <span>3</span>
        <img class="rankList_El_center" src="" alt=" ">
        <span>monsuper.pseudotropcool</span>
        <span class="rankList_El_right">5m 42s</span>
      </li>
      <li class="rankList_El">
        <span>36</span>
        <img class="rankList_El_center" src="" alt=" ">
        <span>mamy.hugette</span>
        <span class="rankList_El_right">22m 10s</span>
      </li>
    </ul>
  </main>
</template>

<style scoped>

</style>
