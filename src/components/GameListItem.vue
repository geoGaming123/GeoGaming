<template>
  
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'created'" @click="sendTo('rank', props.aMatch.id)">
    <td>{{ props.aMatch.acf.title }}<br>{{ props.aMatch.acf.players.length }} joueurs</td>
    <td>{{ rankingFirst.name }}<br>{{ ranking[0].time }} s</td>
    <td>{{ formatDate(props.aMatch.acf.end_date) }}</td>
</tr>
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'joined'" @click="sendTo('rank', props.aMatch.id)">
    <td>{{ props.aMatch.acf.title }}<br>{{ formatDate(props.aMatch.acf.end_date) }}</td>
    <td>{{ rankingFirst.name }}<br>{{ ranking[0].time }} s</td>
    <td>{{ myRank + 1 }}/{{ theMatchPlayers.length }}<br><span v-if="theMatch && myTime.length > 0">{{ myTime[0].time }}s</span></td>
  </tr>
  <tr class="gamelist-item" v-if="title === 'present'" @click="sendTo('game', props.aMatch.id)">
    <td>#{{ props.aMatch.id }} - {{ props.aMatch.acf.title }}<br>{{ props.aMatch.acf.players.length }} joueurs</td>
    <td>{{ dayRemaining }} jours {{ hourRemaining }} heures</td>
  </tr>
  <tr class="gamelist-item" v-if="title === 'futur'"  @click="sendTo('nextgame', props.aMatch.id)">
    <td>#{{ props.aMatch.id }} - {{ props.aMatch.acf.title }}<br>{{ props.aMatch.acf.players.length }} joueurs</td>
    <td>{{ formatDate(props.aMatch.acf.start_date) }} - {{ formattedStartTime }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router'
//import { useCounterStore } from '@/stores/counter'
//import { computed, ref } from 'vue';
const router = useRouter()
//const monStore = useCounterStore()

const props = defineProps({
  aMatch : Object,
  index: Number,
  title: String,
  tab: String,
  myID: String
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR'); // Changez 'fr-FR' par le code de la locale souhaitée
};

const myID = props.myID

const startDateTime = props.aMatch.acf.start_date; // Obtenez la date de fin complète
const startDate = new Date(startDateTime); // Convertissez la chaîne en objet Date
const startHour = startDate.getHours()
const startMin = startDate.getMinutes()
const formattedStartTime = `${startHour}:${startMin < 10 ? '0' : ''}${startMin}`;

const now = new Date();
const futureDate = new Date(props.aMatch.acf.end_date);
const timeDiff = futureDate.getTime() - now.getTime();
const dayRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24));
const hourRemaining = Math.floor((timeDiff / (1000 * 3600)) % 24); // Utilisation de Math.floor au lieu de Math.ceil et correction de la formule

const theMatch = props.aMatch
const theMatchPlayers = theMatch.acf.players
const ranking = theMatchPlayers.slice().sort((a, b) => a.time - b.time)
//const rankingFirst = ranking[0]
const rankingFirst = {name : 'Tibo', time : '222'}
const myTime = theMatchPlayers.filter(player => player.userId == myID)
const myRank = theMatchPlayers.findIndex(i => i.userId == myID)


const sendTo = (txt, id) => {
  router.push(`/${txt}/${id}`);
}



</script>

<style scoped>

</style>