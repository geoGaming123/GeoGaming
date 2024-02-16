<script setup>
import HeaderComp from '@/components/HeaderComp.vue';
import MyRank from '@/components/MyRank.vue';
</script>

<template>
  <main>
    <HeaderComp></HeaderComp>
    <MyRank></MyRank>
    <ul class="rankList">
      <li class="rankListEl first">
        <span>1</span>
        <img class="center" src="" alt=" ">
        <span>monsuper.pseudo</span>
        <span class="right">3m 57s</span>
      </li>
      <li class="rankListEl">
        <span>2</span>
        <img class="center" src="" alt=" ">
        <span>jean</span>
        <span class="right">4m 02s</span>
      </li>
      <li class="rankListEl">
        <span>3</span>
        <img class="center" src="" alt=" ">
        <span>monsuper.pseudotropcool</span>
        <span class="right">5m 42s</span>
      </li>
      <li class="rankListEl">
        <span>36</span>
        <img class="center" src="" alt=" ">
        <span>mamy.hugette</span>
        <span class="right">22m 10s</span>
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .rankList {
    padding-inline-start: 0;
    font-size: 1rem;
    width: 100%;
    padding-block-start: .5rem;
    font-weight: 500;
  }
  .rankListEl {
    list-style: none;
    width: 100%;
    padding-inline: 1.5rem;
    padding-block: .5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 2fr;
    align-items: center;
  }
  .first {
    color: orange;
  }
  .right {
    text-align: right;
  }
  .center {
    text-align: center;
  }
</style>
