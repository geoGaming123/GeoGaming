<template>
  
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'created'" @click="sendTo('rank', props.aMatch.id)">
    <td>{{ props.aMatch.acf.title }}<br>{{ props.aMatch.acf.players.length }} joueurs</td>
    <td>{{ bestUser.name }}<br>{{ bestTime.time }} s</td>
    <td>{{ formatDate(props.aMatch.acf.end_date) }}</td>
</tr>
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'joined'" @click="sendTo('rank', props.aMatch.id)">
    <td>{{ props.aMatch.acf.title }}<br>{{ formatDate(props.aMatch.acf.end_date) }}</td>
    <td>{{ bestUser.name }}<br>{{ bestTime.time }} s</td>
    <td>{{ playerIndex + 1 }}/{{ ranking.length }}<br><span v-if="theMatch && myTime.length > 0">{{ myTime[0].time }}s</span></td>
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
import { useCounterStore } from '@/stores/counter'
import { computed } from 'vue';
const router = useRouter()
const monStore = useCounterStore()

const props = defineProps({
  aMatch : Object,
  index: Number,
  title: String,
  tab: String
})

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR'); // Changez 'fr-FR' par le code de la locale souhaitée
};

const myID = 9

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

const theMatch = props.aMatch
const theMatchPlayers = theMatch.acf.players
const myTime = theMatchPlayers.filter(player => player.userId == myID)
const bestTime = theMatchPlayers.reduce((minPlayer, currentPlayer) => {
    if (!minPlayer || currentPlayer.time < minPlayer.time) {return currentPlayer;}
    return minPlayer;
}, null);
const ranking = theMatchPlayers.sort((a, b) => {
  return parseInt(a.time) - parseInt(b.time);
})
const playerIndex = ranking.findIndex(player => player.userId == myID);

//const rankingFirst = ranking[0]
monStore.getUser(9) //rankingFirst.userId
const bestUser = computed(()=>monStore.getMyUser)

const sendTo = (txt, id) => {
  router.push(`/${txt}/${id}`);
}

</script>

<style scoped>

</style>