<template>
  
  <tr class="gamelist-item" v-if="title === 'past'" @click="sendTo('rank', props.aMatch.id)">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ formatDate(props.aMatch.acf.end_date) }}</th>
  </tr>
  <tr class="gamelist-item" v-if="title === 'present'" @click="sendTo('game', props.aMatch.id)">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ dayRemaining }} jours {{ hourRemaining }} heures</th>
  </tr>
  <tr class="gamelist-item" v-if="title === 'futur'"  @click="sendTo('nextgame', props.aMatch.id)">
    <th>{{ props.aMatch.acf.title }}</th>
    <th>{{ props.aMatch.acf.players.length }}</th>
    <th>{{ formatDate(props.aMatch.acf.start_date) }} - {{ formattedStartTime }}</th>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router'
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
var hourRemaining = Math.floor((timeDiff / (1000 * 3600)) % 24); // Utilisation de Math.floor au lieu de Math.ceil et correction de la formule


const sendTo = (txt, id) => {
  // console.log(txt + id)
  router.push(`/${txt}/${id}`);
}

</script>

<style scoped>
  .gamelist-item th {
    padding-top: .4rem;
    font-size: .9rem;
  }
</style>