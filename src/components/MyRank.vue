<template>
  <div class="myRank">
    <img src="" alt=" "><span class="myRank_pseudo">Rocko</span>
    <div class="myRank_Stat">
      <span>15e</span><span>{{ props.rank.time }}</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  rank: Object
})
</script>

<style scoped>

</style>