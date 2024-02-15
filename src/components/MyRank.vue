<template>
  <div class="myRank">
    <img src="" alt="Ma photo"><span class="pseudo">Rocko</span>
    <div class="myRankStat">
      <span>15e</span><span>50 pts</span>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
  .myRank {
    width: 100%;
    background-color: orange;
    text-align: center;
    padding: 1rem;
    font-size: 1.5rem;
    color: white;
  }
  .pseudo {
    margin-inline-start: 1rem;
  }
  .myRankStat {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
</style>