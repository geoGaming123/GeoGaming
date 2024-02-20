<template>
  <tr class="gamelist-item" v-if="title === 'past'">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ formatDate(props.aMatch.acf.end_date) }}</th>
  </tr>
  <tr class="gamelist-desc" v-if="title === 'past'">
    <th colspan="3">
      {{ props.aMatch.acf.description }}
    </th>
  </tr>
  <tr class="gamelist-item" v-if="title === 'present'">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ dayRemaining }} jours {{ hourRemaining }} heures</th>
  </tr>
  <tr class="gamelist-desc" v-if="title === 'present'">
    <th colspan="3">
      {{ props.aMatch.acf.description }}
    </th>
  </tr>
  <tr class="gamelist-item" v-if="title === 'futur'">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ formatDate(props.aMatch.acf.start_date) }} - {{ formattedStartTime }}</th>
  </tr>
  <tr class="gamelist-desc" v-if="title === 'futur'">
    <th colspan="3">
      {{ props.aMatch.acf.description }}
    </th>
  </tr>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  aMatch : Object,
  index: Number,
  title: String
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR'); // Changez 'fr-FR' par le code de la locale souhaitée
};

const startDateTime = props.aMatch.acf.start_date; // Obtenez la date de fin complète
const startDate = new Date(startDateTime); // Convertissez la chaîne en objet Date
const startHour = startDate.getHours()
const startMin = startDate.getMinutes()
const formattedStartTime = `${startHour}:${startMin < 10 ? '0' : ''}${startMin}`;

var now = new Date();
var futureDate = new Date(props.aMatch.acf.end_date);
var timeDiff = futureDate.getTime() - now.getTime();
var dayRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
var hourRemaining = Math.floor((timeDiff / (1000 * 3600)) % 24); 

</script>

<style scoped>
  .gamelist-item th {
    padding-top: .4rem;
    font-size: .9rem;
  }
  .gamelist-desc th {
    padding-bottom: .4rem;
    font-size: .7rem;
    border-bottom: 1px solid #00000020;
  }
</style>