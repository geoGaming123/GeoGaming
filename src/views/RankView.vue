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
        <img class="center" src="" alt="Ma Photo">
        <span>monsuper.pseudo</span>
        <span class="right">180 pts</span>
      </li>
      <li class="rankListEl">
        <span>1</span>
        <img class="center" src="" alt="Ma Photo">
        <span>jean</span>
        <span class="right">180 pts</span>
      </li>
      <li class="rankListEl">
        <span>1</span>
        <img class="center" src="" alt="Ma Photo">
        <span>monsuper.pseudotropcool</span>
        <span class="right">180 pts</span>
      </li>
    </ul>
  </main>
</template>

<style scoped>
  .rankList {
    padding: 0;
    font-size: 1rem;
    width: 100%;
  }
  .rankListEl {
    list-style: none;
    width: 100%;
    padding: 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr 5fr 2fr;
    align-items: center;
    font-size: 1rem;
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
