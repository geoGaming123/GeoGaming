<template>
  <tr class="gamelist-item">
    <th>{{ props.index + 1 }}</th>
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ JSON.parse(props.aMatch.acf.players).length }}</th>
    <th>{{ formatDate(props.aMatch.acf.start_date) }}</th>
  </tr>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const router = useRouter()

 const props = defineProps({
    aMatch : Object,
    index: Number
  })
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR'); // Changez 'fr-FR' par le code de la locale souhaitée
};

</script>

<style scoped>
  .gamelist-item th {
    padding: .4rem;
  }
</style>