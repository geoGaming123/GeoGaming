<template>
  
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'created'" @click="sendTo('rank', props.aMatch.id)">
    <td><span class="gamelist-item-id">#{{ props.aMatch.id }} - </span><span class="gamelist-item-title">{{ props.aMatch.acf.title }}</span><br><span class="gamelist-item-nbr">{{ props.aMatch.acf.players.length }}</span><span class="gamelist-item-players"> joueurs</span></td>
    <td><span class="gamelist-item-winner">{{ rankingFirst.name }}</span><br><span class="gamelist-item-winner-score">{{ ranking[0].score }}</span></td>
    <td>{{ formatDate(props.aMatch.acf.end_date) }}</td>
</tr>
  <tr class="gamelist-item" v-if="title === 'past' && tab === 'joined'" @click="sendTo('rank', props.aMatch.id)">
    <td><span class="gamelist-item-id">#{{ props.aMatch.id }} - </span><span class="gamelist-item-title">{{ props.aMatch.acf.title }}</span><br>{{ formatDate(props.aMatch.acf.end_date) }}</td>
    <td><span class="gamelist-item-winner">{{ rankingFirst.name }}</span><br><span class="gamelist-item-winner-score">{{ ranking[0].score }}</span></td>
    <td>{{ myRank + 1 }} / {{ theMatchPlayers.length }}<br><span class="gamelist-item-winner-score" v-if="theMatch && myTime.length > 0">{{ myTime[0].score }}</span></td>
  </tr>
  <tr class="gamelist-item" v-if="title === 'present'" @click="sendTo('game', props.aMatch.id)">
    <td><span class="gamelist-item-id">#{{ props.aMatch.id }} - </span><span class="gamelist-item-title">{{ props.aMatch.acf.title }}</span><br><span class="gamelist-item-nbr">{{ props.aMatch.acf.players.length }}</span><span class="gamelist-item-players"> joueurs</span></td>
    <td>{{ dayRemaining }} jours {{ hourRemaining }} heures</td>
  </tr>
  <tr class="gamelist-item" v-if="title === 'futur'"  @click="sendTo('nextgame', props.aMatch.id)">
    <td><span class="gamelist-item-id">#{{ props.aMatch.id }} - </span><span class="gamelist-item-title">{{ props.aMatch.acf.title }}</span><br><span class="gamelist-item-nbr">{{ props.aMatch.acf.players.length }}</span><span class="gamelist-item-players"> joueurs</span></td>
    <td>{{ formatDate(props.aMatch.acf.start_date) }} - {{ formattedStartTime }}</td>
  </tr>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  aMatch : Object,
  index: Number,
  title: String,
  tab: String,
  myID: Number
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

const now = new Date(); // Récupère la date du jour
const futureDate = new Date(props.aMatch.acf.end_date); // Récupère la date de fin de partie
const timeDiff = futureDate.getTime() - now.getTime(); // Calcule le temps restant
const dayRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Jours restants
const hourRemaining = Math.floor((timeDiff / (1000 * 3600)) % 24); // Heures restantes

const theMatch = props.aMatch // Données de la partie
const theMatchPlayers = theMatch.acf.players // Joueurs de la partie
const ranking = theMatchPlayers.slice().sort((a, b) => a.score - b.score) // Trié dans l'ordre de leur temps
const myTime = theMatchPlayers.filter(player => player.userId == myID) // Récupére score id connecté
const myRank = theMatchPlayers.findIndex(i => i.userId == myID) // Position dans le tableau 

const rankingFirst = ranking[0]

const sendTo = (txt, id) => {
  router.push(`/${txt}/${id}`);
}



</script>@/stores/data