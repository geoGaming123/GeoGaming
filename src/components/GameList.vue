<template>
  <section class="gamelist">
    <section class="gamelist-content">
      <table>

        <!--   ********************   Parties passées   ********************   -->

        <thead v-if="title === 'past' && activeTab === 'created'">
          <tr class="gamelist-title">
            <td>Lieu<br>Joueurs</td>
            <td>Gagnant<br>Temps</td>
            <td>Date de fin</td>
          </tr>
        </thead>
        <thead v-if="title === 'past' && activeTab === 'joined'">
          <tr class="gamelist-title">
            <td>Lieu<br>Date de fin</td>
            <td>Gagnant<br>Temps</td>
            <td>Votre classement<br>Votre temps</td>
          </tr>
        </thead>

        <!--   ********************   Parties En cours   ********************   -->
        
        <thead v-if="title === 'present'">
          <tr class="gamelist-title">
            <td>Lieu<br>Joueurs</td>
            <td>Temps restant</td>
          </tr>
        </thead>

        <!--   ********************   Parties Futures   ********************   -->

        <thead v-if="title === 'futur'">
          <tr class="gamelist-title">
            <td>Lieu<br>Joueurs</td>
            <td>Date - Heure de début</td>
          </tr>
        </thead>


        <GameListID :Matches="myMatches" :title="title" :myID="myID" :tab="activeTab" v-show="activeTab === 'created'"></GameListID>
        <GameListID :Matches="otherMatches" :title="title" :myID="myID" :tab="activeTab" v-show="activeTab === 'available'"></GameListID>
        <GameListID :Matches="joinedMatches" :title="title" :myID="myID" :tab="activeTab" v-show="activeTab === 'joined'"></GameListID>
      </table>
    </section>
    <section class="gamelist-onglets">
      <div class="gamelist-onglets-btns"> 
        <button @click="activateTab('created')" :class="{ 'gamelist-activebtn': activeTab === 'created' }">Créées</button>
        <button @click="activateTab('available')" :class="{ 'gamelist-activebtn': activeTab === 'available' , hidden: activeMenu == 'past' }">Disponibles</button>
        <button @click="activateTab('joined')" :class="{ 'gamelist-activebtn': activeTab === 'joined' }">Rejointes</button>
      </div>
    </section>
    <button @click="addGame()" class="gamelist-addgame" :class="{hidden: activeMenu == 'past'}" >+</button>
  </section>
</template>

<script setup>
import GameListID from '@/components/GameListID.vue';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  menu: String,
  MatchesData: Array, // Tableau différent selon GameList actif
  title: String,
  myID: String
});

const activeTab = ref('created');
const activateTab = (tab) => { // Check l'onglet actif pour afficher liste de partie qui correspond
  activeTab.value = tab;
};

const activeMenu = ref(null);
watch(() => props.menu, (newMenu) => { // Récupère le menu actif pour l'affichage de l'onglet disponbible
  activeMenu.value = newMenu;
});

const myID = props.myID
const myMatches = computed(()=>(props.MatchesData.filter(match => match.acf.masteruid == myID)))
const joinedMatches = computed(()=>(props.MatchesData.filter(match => match.acf.players.some(player => player.userId == myID))))
const otherMatches = computed(()=>(props.MatchesData.filter(match => {return match.acf.masteruid != myID && !match.acf.players.some(player => player.userId == myID)})))

const addGame = () => { // Fonction du bouton "+"
  console.log('Add a Game');
  router.push('/gameform')
};
</script>

<style scoped>

</style>